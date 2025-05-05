import { readFile } from 'node:fs/promises';

const ANY_WHITE_SPACES_REGULAR_EXPRESSION = /\s+/;

export async function readShapeData(path: string): Promise<string[][]> {
  const content = await readFile(path, 'utf-8');
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.split(ANY_WHITE_SPACES_REGULAR_EXPRESSION));
}
