import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const logo = await readFile(new URL("../public/RNLogo.svg", import.meta.url));
const portrait = await readFile(new URL("../public/MRNFacePotrait.svg", import.meta.url));

await sharp(logo, { density: 400 })
  .resize(128, 128, { fit: "contain", background: "#101010" })
  .flatten({ background: "#101010" })
  .png()
  .toFile(fileURLToPath(new URL("../public/rnfavicon.png", import.meta.url)));

const title = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#101010"/>
    <text x="92" y="422" fill="#e7e7e7" font-family="Arial, Helvetica, sans-serif" font-size="74" letter-spacing="-2">Rezwan Navid</text>
    <text x="95" y="476" fill="#999" font-family="Arial, Helvetica, sans-serif" font-size="28">Product Thinker · Building systems with impact</text>
  </svg>`);

await sharp(title)
  .composite([
    { input: await sharp(logo, { density: 300 }).resize({ width: 150 }).png().toBuffer(), left: 93, top: 90 },
    { input: await sharp(portrait, { density: 220 }).resize(560, 560).png().toBuffer(), left: 610, top: 35 },
  ])
  .png()
  .toFile(fileURLToPath(new URL("../public/linkheader.png", import.meta.url)));
