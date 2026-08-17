/* eslint-disable no-console */
// Generates public/sprite.artifact.svg from the SVGs in
// source/01-global/icon/svgs, so Icon can reference each icon via
// <use href="/sprite.artifact.svg#name">.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const svgsDir = path.join(
  import.meta.dirname,
  '..',
  'source/01-global/icon/svgs',
);
const spritePath = path.join(
  import.meta.dirname,
  '..',
  'public/sprite.artifact.svg',
);

function toSymbol(name, contents) {
  const viewBoxMatch = contents.match(/viewBox=["']([^"']+)["']/i);
  if (!viewBoxMatch) {
    throw new Error(`No viewBox found in ${name}.svg`);
  }

  const bodyMatch = contents.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  if (!bodyMatch) {
    throw new Error(`No <svg> element found in ${name}.svg`);
  }

  return `<symbol id="${name}" viewBox="${viewBoxMatch[1]}">${bodyMatch[1]}</symbol>`;
}

async function generateSprite() {
  const filenames = (await readdir(svgsDir))
    .filter(filename => filename.endsWith('.svg'))
    .sort();

  const symbols = await Promise.all(
    filenames.map(async filename => {
      const name = path.basename(filename, '.svg');
      const contents = await readFile(path.join(svgsDir, filename), 'utf8');
      return toSymbol(name, contents);
    }),
  );

  const sprite = `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols.join('\n')}\n</svg>\n`;

  await writeFile(spritePath, sprite);
  console.log(`Wrote ${symbols.length} icons to ${spritePath}`);
}

generateSprite();
