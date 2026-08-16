import sharp from "sharp";
import path from "path";

async function removeBlackBackground() {
  const inputPath = path.join(process.cwd(), "public", "logo.jpg");
  const outputPath = path.join(process.cwd(), "public", "logo.png");

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Image info: ${width}x${height}, channels: ${channels}`);

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const maxVal = Math.max(r, g, b);

    // If pixel is black/dark background
    if (maxVal < 18) {
      data[i + 3] = 0; // completely transparent
    } else if (maxVal < 45 && r < 40 && g < 40 && b < 40) {
      // Smooth feathering on edges
      const alpha = Math.round(((maxVal - 18) / (45 - 18)) * 255);
      data[i + 3] = alpha;
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .png()
    .toFile(outputPath);

  console.log("Successfully created transparent background logo at:", outputPath);
}

removeBlackBackground().catch(console.error);
