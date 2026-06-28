import { readdir, stat } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }

  return files;
}

async function getDimensions(filePath) {
  const { default: sharp } = await import("sharp").catch(() => ({ default: null }));
  if (!sharp) return null;
  const meta = await sharp(filePath).metadata();
  return { width: meta.width, height: meta.height };
}

async function main() {
  const files = await walk(publicDir);
  const introOrImages = (p) => p.includes(`${join("public", "intro")}`) || p.includes(`${join("public", "images")}`);

  console.log("=== Jamana Hub image audit ===\n");

  for (const file of files.sort()) {
    const rel = file.replace(publicDir, "").replace(/\\/g, "/");
    const info = await stat(file);
    const kb = Math.round(info.size / 1024);
    const dims = await getDimensions(file);
    const dimStr = dims ? `${dims.width}x${dims.height}` : "unknown";
    const flags = [];

    const isFullscreen = introOrImages(file) || rel.includes("intro");
    if (isFullscreen && dims?.width && dims.width < 1200) {
      flags.push("⚠ width < 1200px (blur risk on fullscreen)");
    }
    if (isFullscreen && kb > 500) {
      flags.push("⚠ size > 500KB (slow fullscreen load)");
    }

    console.log(`${rel} — ${dimStr}, ${kb}KB`);
    for (const flag of flags) console.log(`  ${flag}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
