// One-Line Office Jokes — make.fun entry for lerrboyy.
// Writes a single validated line to <OUTPUT_DIR>/entry.txt.
// Node 22, no dependencies, no network.

import { mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I hit reply-all to tell everyone to stop replying all, and now 47 people are replying all to agree with me.";

const MIN_CHARS = 1;
const MAX_CHARS = 199;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Validate the entry against the kit gate: 1-199 Unicode code points,
// exactly one line, no leading/trailing whitespace, no control characters.
const chars = [...ENTRY];
if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
  fail(`entry is ${chars.length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
}
if (ENTRY.trim() !== ENTRY) {
  fail("entry has leading or trailing whitespace");
}
if (ENTRY.trim().length === 0) {
  fail("entry is only whitespace");
}
for (const ch of ENTRY) {
  const code = ch.codePointAt(0);
  if (
    code < 0x20 ||
    code === 0x7f ||
    code === 0x2028 ||
    code === 0x2029 ||
    // Any Unicode space separator other than a plain ASCII space would
    // look like a space to the judge but break the single-line reading.
    (code >= 0x00a0 && code <= 0x200b) ||
    code === 0x3000 ||
    code === 0xfeff
  ) {
    fail(`entry contains a forbidden character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
  }
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

// Clear only the contents of the output dir, never the dir itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

const outPath = join(outDir, "entry.txt");
const expected = Buffer.from(ENTRY, "utf8");
writeFileSync(outPath, expected);

// Read back and verify byte-for-byte before reporting success.
const actual = readFileSync(outPath);
if (!actual.equals(expected)) {
  fail("verification failed: entry.txt does not match the entry byte-for-byte");
}
// Re-check the written file on its own terms: char count and single line,
// so a bad write cannot slip past a buffer comparison alone.
const written = actual.toString("utf8");
if ([...written].length !== chars.length) {
  fail(`verification failed: entry.txt has ${[...written].length} characters, expected ${chars.length}`);
}
if (written.includes("\n") || written.includes("\r")) {
  fail("verification failed: entry.txt is not a single line");
}

console.log(`wrote ${outPath}: ${chars.length} characters, ${expected.length} bytes, single line, no trailing newline`);
