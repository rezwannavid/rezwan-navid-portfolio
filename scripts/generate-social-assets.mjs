import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const logo = await readFile(new URL("../public/RNLogo.svg", import.meta.url));
const portrait = await readFile(new URL("../public/home-design/profile-card-portrait.png", import.meta.url));

const title = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#101010"/>
    <text x="92" y="300" fill="#e7e7e7" font-family="Arial, Helvetica, sans-serif" font-size="60" letter-spacing="-1.5">Product Brain,</text>
    <text x="92" y="365" fill="#e7e7e7" font-family="Arial, Helvetica, sans-serif" font-size="60" letter-spacing="-1.5">Design Heart</text>
    <text x="95" y="430" fill="#e7e7e7" font-family="Arial, Helvetica, sans-serif" font-size="34">Mir Rezwan Navid</text>
    <text x="95" y="475" fill="#999" font-family="Arial, Helvetica, sans-serif" font-size="25">Design Engineer, Product Thinker</text>
  </svg>`);

const socialImage = await sharp(title)
  .composite([
    { input: await sharp(logo, { density: 300 }).resize({ width: 150 }).png().toBuffer(), left: 93, top: 90 },
    { input: await sharp(portrait).resize(410, 410, { fit: "cover" }).png().toBuffer(), left: 750, top: 110 },
  ])
  .png()
  .toBuffer();

await Promise.all([
  sharp(socialImage).toFile(fileURLToPath(new URL("../public/linkheader.png", import.meta.url))),
  sharp(socialImage).toFile(fileURLToPath(new URL("../public/rezwan-navid-portfolio-og.png", import.meta.url))),
]);
