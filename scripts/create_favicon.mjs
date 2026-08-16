import sharp from "sharp";
import path from "path";

async function generateFavicon() {
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const appIconPngPath = path.join(process.cwd(), "src", "app", "icon.png");
  const publicIconPngPath = path.join(process.cwd(), "public", "icon.png");

  // Create square favicon with brand emblem on dark rounded tile
  const size = 128;
  const innerLogo = await sharp(logoPath)
    .resize(size - 16, Math.round((size - 16) / 2), { fit: "contain" })
    .toBuffer();

  const svgBackground = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a0a0a"/>
          <stop offset="100%" stop-color="#1e1e1e"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="28" fill="url(#bgGrad)"/>
      <rect x="2" y="2" width="${size - 4}" height="${size - 4}" rx="26" fill="none" stroke="#dc2626" stroke-width="3"/>
    </svg>
  `);

  await sharp(svgBackground)
    .composite([
      {
        input: innerLogo,
        gravity: "center",
      },
    ])
    .png()
    .toFile(appIconPngPath);

  // Copy to public as well
  await sharp(appIconPngPath).toFile(publicIconPngPath);

  console.log("Successfully generated app favicon at:", appIconPngPath);
}

generateFavicon().catch(console.error);
