import { readFile } from 'node:fs/promises';

const files = [
  'css/variables.css',
  'css/base.css',
  'css/components/header.css',
  'css/components/timeline.css',
  'css/components/top-bar.css',
  'css/components/theme-toggle.css',
  'css/components/footer.css',
];

export const data = {
  permalink: '/bundle.css',
  eleventyExcludeFromCollections: true,
};

export async function render() {
  const contents = await Promise.all(
    files.map((file) => readFile(file, 'utf8')),
  );
  return contents.join('\n');
}
