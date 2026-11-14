// Rend scripts/og-image.html en public/og-image.png (1200x630).
// Utilise le Chrome installé, comme scripts/generate-brand.py.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ici = path.dirname(fileURLToPath(import.meta.url));
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
  "--allow-file-access-from-files", "--virtual-time-budget=3000",
  "--window-size=1200,630", `--screenshot=${path.join(ici, "../public/og-image.png")}`,
  `file://${path.join(ici, "og-image.html")}`,
]);
console.log("og-image.png rendue");
