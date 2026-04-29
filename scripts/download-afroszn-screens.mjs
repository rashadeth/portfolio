/**
 * Downloads the 3 AFROSZN dashboard screens from Figma and saves them
 * as PNGs in public/images/afroszn/.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=<your_token> node scripts/download-afroszn-screens.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
if (!TOKEN) {
  console.error("Error: FIGMA_ACCESS_TOKEN is not set.");
  process.exit(1);
}

const FILE_KEY = "xrYv9ACQq4AA8p7KK9K20S";
const NODES = [
  { id: "907:143716", name: "create-event" },
  { id: "907:143871", name: "analytics-dashboard" },
  { id: "907:144732", name: "ticket-management" },
];

const OUT_DIR = join(ROOT, "public/images/afroszn");
mkdirSync(OUT_DIR, { recursive: true });

console.log(`Requesting export URLs for ${NODES.length} nodes…`);

const ids = NODES.map((n) => n.id).join(",");
const exportUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=2`;

const exportRes = await fetch(exportUrl, {
  headers: { "X-Figma-Token": TOKEN },
});

if (!exportRes.ok) {
  const text = await exportRes.text();
  console.error(`Figma API error ${exportRes.status}: ${text}`);
  process.exit(1);
}

const { err, images } = await exportRes.json();
if (err) {
  console.error("Figma API returned error:", err);
  process.exit(1);
}

for (const node of NODES) {
  const url = images[node.id];
  if (!url) {
    console.warn(`  ⚠  No URL for node ${node.id} (${node.name})`);
    continue;
  }

  process.stdout.write(`  Downloading ${node.name}.png … `);
  const imgRes = await fetch(url);
  if (!imgRes.ok) {
    console.log(`FAILED (${imgRes.status})`);
    continue;
  }

  const buffer = Buffer.from(await imgRes.arrayBuffer());
  writeFileSync(join(OUT_DIR, `${node.name}.png`), buffer);
  console.log(`done (${(buffer.length / 1024).toFixed(0)} KB)`);
}

console.log(`\nAll done → public/images/afroszn/`);
