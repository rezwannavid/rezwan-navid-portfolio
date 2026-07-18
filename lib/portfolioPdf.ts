import { readFileSync } from "node:fs";
import path from "node:path";
import { inflateSync } from "node:zlib";

export const portfolioPdfHref = "/Rezwan-Navid-Portfolio-2026.pdf";

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function extractPageCount(pdf: Buffer) {
  const source = pdf.toString("latin1");
  const searchableSections = [source];
  let cursor = 0;

  while ((cursor = source.indexOf("stream", cursor)) !== -1) {
    const lineEnd = source.indexOf("\n", cursor);
    const streamEnd = source.indexOf("endstream", lineEnd);
    if (lineEnd === -1 || streamEnd === -1) break;

    const dictionary = source.slice(Math.max(0, cursor - 1000), cursor);
    if (dictionary.includes("/FlateDecode")) {
      let dataEnd = streamEnd;
      if (pdf[dataEnd - 1] === 10) dataEnd -= 1;
      if (pdf[dataEnd - 1] === 13) dataEnd -= 1;

      try {
        searchableSections.push(inflateSync(pdf.subarray(lineEnd + 1, dataEnd)).toString("latin1"));
      } catch {
        // Non-page streams can use additional filters; they are irrelevant here.
      }
    }

    cursor = streamEnd + "endstream".length;
  }

  const pageTreeCounts = searchableSections.flatMap((section) =>
    [...section.matchAll(/\/Type\s*\/Pages\b[\s\S]{0,1000}?\/Count\s+(\d+)/g)].map((match) => Number(match[1])),
  );
  if (pageTreeCounts.length) return Math.max(...pageTreeCounts);

  const pageObjects = searchableSections.reduce(
    (total, section) => total + [...section.matchAll(/\/Type\s*\/Page\b/g)].length,
    0,
  );
  if (pageObjects) return pageObjects;

  throw new Error(`Unable to extract a page count from ${portfolioPdfHref}`);
}

export function getPortfolioPdfMetadata() {
  const pdf = readFileSync(path.join(process.cwd(), "public", portfolioPdfHref.slice(1)));

  return {
    fileSize: formatFileSize(pdf.byteLength),
    href: portfolioPdfHref,
    pageCount: extractPageCount(pdf),
  };
}
