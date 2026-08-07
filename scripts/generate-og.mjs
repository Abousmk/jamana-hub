import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const width = 1200;
const height = 630;
const emblemPath = join(root, "public/Jamana_embleme_seul_transparent.png");

const svg = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0A1C15"/>
  <rect x="48" y="48" width="${width - 96}" height="${height - 96}" fill="none" stroke="#C8A951" stroke-opacity="0.35" stroke-width="1"/>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="52" fill="#F5F0E3">Jamana Hub</text>
  <text x="600" y="490" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="6" fill="#C8A951">FOI · AMBITION · EXCELLENCE</text>
</svg>`);

const emblem = await sharp(emblemPath)
  .resize(200, 200, { fit: "contain" })
  .png()
  .toBuffer();

await sharp(svg)
  .composite([
    { input: emblem, top: 140, left: Math.round((width - 200) / 2) },
  ])
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(join(root, "public/og-image.jpg"));

await sharp(emblemPath)
  .resize(180, 180, {
    fit: "contain",
    background: { r: 10, g: 28, b: 21, alpha: 1 },
  })
  .flatten({ background: { r: 10, g: 28, b: 21 } })
  .png()
  .toFile(join(root, "public/apple-touch-icon.png"));

console.log("Created public/og-image.jpg and public/apple-touch-icon.png");
