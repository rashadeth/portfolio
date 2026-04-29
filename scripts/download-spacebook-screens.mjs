/**
 * Downloads the 5 Spacebook admin dashboard screens from Figma and saves them
 * as PNGs in public/images/spacebook/.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=<your_token> node scripts/download-spacebook-screens.mjs
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
  { id: "890:25578", name: "my-spaces-empty" },
  { id: "890:25782", name: "my-spaces-listings" },
  { id: "890:26035", name: "my-spaces-set-status" },
  { id: "890:26311", name: "list-new-space" },
  { id: "890:26664", name: "edit-space-details" },
];

const OUT_DIR = join(ROOT, "public/images/spacebook");
mkdirSync(OUT_DIR, { recursive: true });

console.log(`Requesting export URLs for ${NODES.length} nodes…`);

// Fetch in two batches to avoid Figma's render-timeout on tall screens
async function fetchBatch(batch) {
  const ids = batch.map((n) => n.id).join(",");
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=1.5`;
  const res = await fetch(url, { headers: { "X-Figma-Token": TOKEN } });
  if (!res.ok) {
    const text = await res.text();
    console.error(`Figma API error ${res.status}: ${text}`);
    process.exit(1);
  }
  const { err, images } = await res.json();
  if (err) { console.error("Figma API error:", err); process.exit(1); }
  return images;
}

const batchA = NODES.slice(0, 3);
const batchB = NODES.slice(3);
console.log(`Fetching batch 1 (${batchA.length} nodes)…`);
const imagesA = await fetchBatch(batchA);
console.log(`Fetching batch 2 (${batchB.length} nodes)…`);
const imagesB = await fetchBatch(batchB);
const images = { ...imagesA, ...imagesB };

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

console.log(`\nAll done → public/images/spacebook/`);
