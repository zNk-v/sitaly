"""Génère le kit logo Sitaly (SVG + PNG) à partir de la DA 2026 du site."""
import math, os, subprocess, io
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import uharfbuzz as hb
from PIL import Image

ROOT = "/Users/vidalozzi/sitaly"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
TMP = os.path.join(HERE, "tmp")
os.makedirs(OUT, exist_ok=True); os.makedirs(TMP, exist_ok=True)
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# ---------------------------------------------------------------- couleurs
def oklch(L, C, h):
    a = C * math.cos(math.radians(h)); b = C * math.sin(math.radians(h))
    l_ = L + 0.3963377774*a + 0.2158037573*b
    m_ = L - 0.1055613458*a - 0.0638541728*b
    s_ = L - 0.0894841775*a - 1.2914855480*b
    l, m, s = l_**3, m_**3, s_**3
    r = 4.0767416621*l - 3.3077115913*m + 0.2309699292*s
    g = -1.2684380046*l + 2.6097574011*m - 0.3413193965*s
    bb = -0.0041960863*l - 0.7034186147*m + 1.7076147010*s
    f = lambda x: max(0, min(1, 1.055*x**(1/2.4) - 0.055 if x > 0.0031308 else 12.92*x))
    return "#%02x%02x%02x" % tuple(round(f(v)*255) for v in (r, g, bb))

def ramp(stops, n=9):
    """Interpole dans oklch (chemin court par le magenta), comme le site."""
    out = []
    for i in range(n):
        t = i/(n-1)
        seg = min(int(t*(len(stops)-1)), len(stops)-2)
        u = t*(len(stops)-1) - seg
        a, b = stops[seg], stops[seg+1]
        ha, hb_ = a[2], b[2]
        if hb_ - ha > 180: hb_ -= 360
        if ha - hb_ > 180: hb_ += 360
        out.append((t, oklch(a[0]+(b[0]-a[0])*u, a[1]+(b[1]-a[1])*u, (ha+(hb_-ha)*u) % 360)))
    return out

TRIADE = ramp([(.50, .19, 258), (.48, .22, 300), (.58, .22, 28)])        # --blue / --violet / --red
RUBAN = ramp([(.46, .162, 258), (.46, .233, 300), (.46, .179, 28)])      # --gradient-ruban
SUR_ENCRE = ramp([(.66, .17, 258), (.66, .19, 300), (.68, .19, 28)])     # --*-on-ink
PAPER = oklch(.985, .004, 85)
INK = oklch(.165, .045, 302)
FG = oklch(.20, .045, 302)
MUTED = oklch(.48, .03, 302)
BLUE_INK = oklch(.47, .166, 258)
VIOLET_INK = oklch(.47, .238, 300)
RED_ACQ = "#aa1212"

def stops_xml(ramp_):
    return "".join(f'<stop offset="{t:.3f}" stop-color="{c}"/>' for t, c in ramp_)

# ---------------------------------------------------------------- polices
_fonts = {}
def font(key, wght):
    if (key, wght) in _fonts: return _fonts[(key, wght)]
    path = f"{ROOT}/public/fonts/{key}-latin.woff2"
    tt = TTFont(path); tt.flavor = None
    inst = instancer.instantiateVariableFont(tt, {"wght": wght})
    buf = io.BytesIO(); inst.save(buf)
    hbfont = hb.Font(hb.Face(hb.Blob(buf.getvalue())))
    _fonts[(key, wght)] = (inst, hbfont)
    return _fonts[(key, wght)]

def text_paths(runs, size, x, y, key="plus-jakarta-sans", wght=800, ls=-0.02, anchor="start"):
    """runs = [(texte, couleur)]. Renvoie (svg, bbox encre). y = ligne de base."""
    inst, hbf = font(key, wght)
    upem = inst["head"].unitsPerEm
    text = "".join(r[0] for r in runs)
    owner = []
    for i, (t, c) in enumerate(runs): owner += [i]*len(t)
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(hbf, buf, {"kern": True, "liga": True})
    order = inst.getGlyphOrder(); gs = inst.getGlyphSet()
    k = size/upem
    total = sum(p.x_advance for p in buf.glyph_positions) + ls*upem*(len(buf.glyph_infos)-1)
    if anchor == "middle": x -= total*k/2
    pen_x = 0; ds = {}; bounds = BoundsPen(gs)
    for gi, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        name = order[info.codepoint]
        tr = (k, 0, 0, -k, x + (pen_x + pos.x_offset)*k, y - pos.y_offset*k)
        p = SVGPathPen(gs); gs[name].draw(TransformPen(p, tr))
        ds.setdefault(owner[info.cluster], []).append(p.getCommands())
        gs[name].draw(TransformPen(bounds, tr))
        pen_x += pos.x_advance + ls*upem
    svg = "".join(f'<path fill="{runs[i][1]}" d="{" ".join(d)}"/>' for i, d in ds.items())
    return svg, bounds.bounds  # (xmin, ymin, xmax, ymax), y vers le bas

# ---------------------------------------------------------------- symbole
# Dessin sur 100 unités. Encre : x 11.5–88.5, y 15.5–84.5.
SYM_INK = (11.5, 15.5, 88.5, 84.5)
def symbol(x, y, h, paint, uid, alpha_first=1.0):
    """Place le symbole pour que son encre ait la hauteur h, coin haut-gauche de l'encre en (x, y)."""
    k = h/69
    tx, ty = x - SYM_INK[0]*k, y - SYM_INK[1]*k
    if isinstance(paint, list):
        defs = f'<linearGradient id="g{uid}" gradientUnits="userSpaceOnUse" x1="12" y1="88" x2="88" y2="12">{stops_xml(paint)}</linearGradient>'
        stroke = f"url(#g{uid})"
    else:
        defs, stroke = "", paint
    body = (f'<g transform="translate({tx:.3f} {ty:.3f}) scale({k:.5f})" fill="none" stroke="{stroke}" '
            f'stroke-width="17" stroke-linecap="round" stroke-linejoin="round">'
            f'<path d="M20 24 46 50 20 76" opacity="{alpha_first}"/><path d="M54 24 80 50 54 76"/></g>')
    return defs, body, (x, y, x + 77*k, y + h)

def svg_doc(w, h, defs, body, px_w=None, px_h=None):
    pw = px_w or w; ph = px_h or h
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" width="{pw:.0f}" height="{ph:.0f}">'
            f'<defs>{defs}</defs>{body}</svg>')

# ---------------------------------------------------------------- logos
CAP = 745  # sCapHeight Plus Jakarta Sans, pour une taille de 1000

def horizontal(sym_paint, text_color, uid):
    size = 1000; base = 1000
    sh = CAP*1.30
    sd, sb, sbox = symbol(0, base - CAP/2 - sh/2, sh, sym_paint, uid)
    gap = CAP*0.34
    t_svg, tb = text_paths([("Sitaly", text_color)], size, 0, base)
    shift = sbox[2] + gap - tb[0]
    t_svg, tb = text_paths([("Sitaly", text_color)], size, shift, base)
    x0, y0 = 0, min(sbox[1], tb[1]); x1, y1 = tb[2], max(sbox[3], tb[3])
    body = f'<g transform="translate({-x0:.2f} {-y0:.2f})">{sb}{t_svg}</g>'
    return sd, body, x1-x0, y1-y0

def stacked(sym_paint, text_color, uid):
    size = 1000; base = 2000
    t_svg, tb = text_paths([("Sitaly", text_color)], size, 0, base, anchor="middle")
    sh = CAP*1.6; sw = 77/69*sh
    sd, sb, sbox = symbol(-sw/2, base - CAP - CAP*0.42 - sh, sh, sym_paint, uid)
    x0 = min(sbox[0], tb[0]); x1 = max(sbox[2], tb[2]); y0 = sbox[1]; y1 = tb[3]
    body = f'<g transform="translate({-x0:.2f} {-y0:.2f})">{sb}{t_svg}</g>'
    return sd, body, x1-x0, y1-y0

def tile(size, radius_ratio, sym_ratio, uid, full_bleed=False):
    r = 0 if full_bleed else size*radius_ratio
    bg = (f'<linearGradient id="t{uid}" gradientUnits="userSpaceOnUse" x1="0" y1="{size}" x2="{size}" y2="0">{stops_xml(RUBAN)}</linearGradient>')
    sh = size*sym_ratio; sw = 77/69*sh
    sd, sb, _ = symbol(size/2 - sw/2 + size*0.012, size/2 - sh/2, sh, "#ffffff", uid)
    body = f'<rect width="{size}" height="{size}" rx="{r:.2f}" fill="url(#t{uid})"/>{sb}'
    return bg + sd, body

files = {}
def save(name, content):
    p = os.path.join(OUT, name); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, "w").write(content); files[name] = p; return p

# Symboles
for name, paint in [("couleur", TRIADE), ("sur-fond-sombre", SUR_ENCRE), ("encre", INK), ("blanc", "#ffffff")]:
    d, b, box = symbol(0, 0, 69, paint, "s")
    save(f"brand/sitaly-symbole-{name}.svg", svg_doc(77, 69, d, b))

# Logos horizontaux et empilés
VARIANTES = [("couleur", TRIADE, FG), ("sur-fond-sombre", SUR_ENCRE, "#ffffff"), ("encre", INK, INK), ("blanc", "#ffffff", "#ffffff")]
dims = {}
for name, paint, col in VARIANTES:
    d, b, w, h = horizontal(paint, col, "h")
    save(f"brand/sitaly-logo-{name}.svg", svg_doc(w, h, d, b, w/h*108, 108)); dims["h"] = (w, h)
    d, b, w, h = stacked(paint, col, "e")
    save(f"brand/sitaly-logo-empile-{name}.svg", svg_doc(w, h, d, b, w/h*240, 240)); dims["e"] = (w, h)

# Carrés
d, b = tile(1024, 0.225, 0.40, "c"); save("brand/sitaly-carre.svg", svg_doc(1024, 1024, d, b))
d, b = tile(1024, 0, 0.36, "a", full_bleed=True); save("brand/sitaly-avatar.svg", svg_doc(1024, 1024, d, b))
# Carré papier avec logo empilé
d, b, w, h = stacked(TRIADE, FG, "p")
k = 1024*0.62/w
save("brand/sitaly-carre-papier.svg", svg_doc(1024, 1024, d,
     f'<rect width="1024" height="1024" fill="{PAPER}"/><g transform="translate({512-w*k/2:.2f} {512-h*k/2:.2f}) scale({k:.5f})">{b}</g>'))

# Favicon SVG : tuile arrondie, lisible sur onglet clair comme sombre
d, b = tile(64, 0.22, 0.50, "f"); save("favicon.svg", svg_doc(64, 64, d, b))
d, b = tile(512, 0, 0.36, "m", full_bleed=True); save("tmp-maskable.svg", svg_doc(512, 512, d, b))
d, b = tile(180, 0, 0.44, "i", full_bleed=True); save("tmp-apple.svg", svg_doc(180, 180, d, b))
d, b = tile(512, 0.225, 0.42, "r"); save("tmp-icon.svg", svg_doc(512, 512, d, b))

# ---------------------------------------------------------------- scènes (OG, bannière)
def champ(W, H, uid, pairs, tint=1.0):
    g = (f'<linearGradient id="ct{uid}" gradientUnits="userSpaceOnUse" x1="0" y1="{H}" x2="{W}" y2="0">'
         f'<stop offset="0" stop-color="{oklch(.5,.19,258)}"/><stop offset=".3" stop-color="{oklch(.5,.19,258)}"/>'
         f'<stop offset=".62" stop-color="{oklch(.48,.22,300)}"/><stop offset="1" stop-color="{oklch(.58,.22,28)}"/></linearGradient>'
         f'<radialGradient id="cf{uid}" gradientUnits="userSpaceOnUse" cx="{W/2}" cy="{H/2}" r="{max(W,H)*0.62}">'
         f'<stop offset=".30" stop-color="#000"/><stop offset=".75" stop-color="#fff"/></radialGradient>'
         f'<mask id="cm{uid}" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="url(#cf{uid})"/></mask>'
         f'<radialGradient id="v1{uid}" cx=".12" cy="-.05" r=".7"><stop offset="0" stop-color="{oklch(.55,.19,258)}" stop-opacity=".18"/><stop offset=".62" stop-color="{oklch(.55,.19,258)}" stop-opacity="0"/></radialGradient>'
         f'<radialGradient id="v2{uid}" cx=".52" cy="-.08" r=".65"><stop offset="0" stop-color="{oklch(.55,.22,300)}" stop-opacity=".16"/><stop offset=".6" stop-color="{oklch(.55,.22,300)}" stop-opacity="0"/></radialGradient>'
         f'<radialGradient id="v3{uid}" cx=".9" cy=".02" r=".6"><stop offset="0" stop-color="{oklch(.62,.2,22)}" stop-opacity=".16"/><stop offset=".6" stop-color="{oklch(.62,.2,22)}" stop-opacity="0"/></radialGradient>')
    paths = "".join(f'<path d="{p}" stroke-width="{sw}" opacity="{op*tint}"/>' for p, sw, op in pairs)
    body = (f'<rect width="{W}" height="{H}" fill="{PAPER}"/>'
            f'<rect width="{W}" height="{H}" fill="url(#v1{uid})"/><rect width="{W}" height="{H}" fill="url(#v2{uid})"/><rect width="{W}" height="{H}" fill="url(#v3{uid})"/>'
            f'<g mask="url(#cm{uid})" fill="none" stroke="url(#ct{uid})" stroke-linecap="round" stroke-linejoin="round">{paths}</g>')
    return g, body

def place_logo(cx, cy, height, uid, paint=TRIADE, col=FG):
    d, b, w, h = horizontal(paint, col, uid)
    k = height/h
    return d, f'<g transform="translate({cx - w*k/2:.2f} {cy - h*k/2:.2f}) scale({k:.5f})">{b}</g>', w*k

# OG 1200×630
W, H = 1200, 630
cd, cb = champ(W, H, "o", [
    ("M -170 360 L 80 610 L -170 860", 70, .55), ("M -15 360 L 235 610 L -15 860", 70, .55),
    ("M 880 -200 L 1130 50 L 880 300", 62, .42), ("M 1035 -200 L 1285 50 L 1035 300", 62, .42)])
ld, lb, _ = place_logo(600, 250, 132, "ol")
tag, _ = text_paths([("installe", BLUE_INK), (" et ", FG), ("pilote", VIOLET_INK), (" votre ", FG), ("présence", RED_ACQ), (" en ligne", FG)],
                    50, 600, 410, anchor="middle")
sub, _ = text_paths([("Site internet  ·  Publicité en ligne  ·  Automatisation", MUTED)], 25, 600, 468, key="inter", wght=500, ls=0, anchor="middle")
url, _ = text_paths([("sitaly.fr", FG)], 22, 600, 560, key="inter", wght=600, ls=0.01, anchor="middle")
save("og-image.svg", svg_doc(W, H, cd + ld, cb + lb + tag + sub + url))

# Bannière LinkedIn 1584×396 (la photo de profil couvre le bas gauche)
W, H = 1584, 396
cd, cb = champ(W, H, "b", [
    ("M 1330 -60 L 1460 70 L 1330 200", 46, .5), ("M 1430 -60 L 1560 70 L 1430 200", 46, .5),
    ("M -40 190 L 150 380 L -40 570", 54, .45), ("M 80 190 L 270 380 L 80 570", 54, .45)])
ld, lb, lw = place_logo(0, 0, 70, "bl")
d, b, w, h = horizontal(TRIADE, FG, "bl2"); k = 70/h
lb = f'<g transform="translate(470 105) scale({k:.5f})">{b}</g>'
tag, _ = text_paths([("installe", BLUE_INK), (" et ", FG), ("pilote", VIOLET_INK), (" votre ", FG), ("présence", RED_ACQ), (" en ligne", FG)], 44, 470, 260)
sub, _ = text_paths([("Site internet  ·  Publicité en ligne  ·  Automatisation", MUTED)], 22, 472, 310, key="inter", wght=500, ls=0)
save("brand/sitaly-banniere-linkedin.svg", svg_doc(W, H, cd + d, cb + lb + tag + sub))

# OG de la page Agents IA
W, H = 1200, 630
cd, cb = champ(W, H, "ai", [
    ("M -170 360 L 80 610 L -170 860", 70, .55), ("M -15 360 L 235 610 L -15 860", 70, .55),
    ("M 880 -200 L 1130 50 L 880 300", 62, .42), ("M 1035 -200 L 1285 50 L 1035 300", 62, .42)])
ld, lb, _ = place_logo(600, 180, 92, "ail")
t1, _ = text_paths([("Agents IA", VIOLET_INK), (" et ", FG), ("automatisation", BLUE_INK)], 72, 600, 365, anchor="middle")
t2, _ = text_paths([("pour TPE, PME et ", FG), ("cabinets", RED_ACQ)], 72, 600, 450, anchor="middle")
sub, _ = text_paths([("Standard, rendez-vous, relances : installés et pilotés pour vous", MUTED)], 25, 600, 530, key="inter", wght=500, ls=0, anchor="middle")
save("og-agents-ia.svg", svg_doc(W, H, cd + ld, cb + lb + t1 + t2 + sub))

# ---------------------------------------------------------------- rendu PNG
def render(svg_path, png_path, w, h):
    html = os.path.join(TMP, "r.html")
    open(html, "w").write(f'<html><body style="margin:0;background:transparent"><img src="file://{svg_path}" style="display:block;width:{w}px;height:{h}px"></body></html>')
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                    "--default-background-color=00000000", f"--window-size={w},{h}", f"--screenshot={png_path}", f"file://{html}"],
                   check=True, capture_output=True)
    os.makedirs(os.path.dirname(png_path), exist_ok=True)
    return png_path

def png(name_svg, name_png, w, h):
    return render(files[name_svg], os.path.join(OUT, name_png), w, h)

os.makedirs(f"{OUT}/brand/png", exist_ok=True)
png("og-image.svg", "og-image.png", 1200, 630)
Image.open(png("og-agents-ia.svg", "og-agents-ia.png", 1200, 630)).convert("RGB").save(f"{OUT}/og-agents-ia.jpg", quality=90)
os.remove(f"{OUT}/og-agents-ia.png")
png("tmp-apple.svg", "apple-touch-icon.png", 180, 180)
png("tmp-icon.svg", "icon-192.png", 192, 192)
png("tmp-icon.svg", "icon-512.png", 512, 512)
png("tmp-maskable.svg", "icon-maskable-512.png", 512, 512)
big = render(files["favicon.svg"], f"{TMP}/fav512.png", 512, 512)
im = Image.open(big).convert("RGBA")
im.resize((32, 32), Image.LANCZOS).save(f"{OUT}/favicon-32.png")
im.save(f"{OUT}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

wh, hh = dims["h"]; we, he = dims["e"]
for name, *_ in VARIANTES:
    png(f"brand/sitaly-logo-{name}.svg", f"brand/png/sitaly-logo-{name}-2000.png", 2000, round(2000*hh/wh))
    png(f"brand/sitaly-logo-empile-{name}.svg", f"brand/png/sitaly-logo-empile-{name}-1200.png", round(1200*we/he), 1200)
    png(f"brand/sitaly-symbole-{name}.svg", f"brand/png/sitaly-symbole-{name}-1024.png", 1024, round(1024*69/77))
png("brand/sitaly-logo-couleur.svg", "brand/png/sitaly-signature-email-600.png", 600, round(600*hh/wh))
png("brand/sitaly-carre.svg", "brand/png/sitaly-carre-1024.png", 1024, 1024)
png("brand/sitaly-avatar.svg", "brand/png/sitaly-avatar-800.png", 800, 800)
png("brand/sitaly-carre-papier.svg", "brand/png/sitaly-carre-papier-1024.png", 1024, 1024)
png("brand/sitaly-banniere-linkedin.svg", "brand/png/sitaly-banniere-linkedin-1584x396.png", 1584, 396)
for t in ("tmp-maskable.svg", "tmp-apple.svg", "tmp-icon.svg"): os.remove(files[t])
print("ok", dims)
