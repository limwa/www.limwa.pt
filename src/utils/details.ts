import fs from 'fs/promises';
import TOML from '@ltd/j-toml';
import { z } from 'zod';

const DETAIL_DIRECTORY = './data/details/';

export const DetailParser = z
  .object({
    name: z.string().min(1),
  })
  .and(
    z
      .object({
        type: z.literal('redirect'),
        value: z.string().url(),
      })
      .or(
        z.object({
          type: z.literal('text'),
          value: z.string().min(1),
        })
      )
  );

export type Detail = z.infer<typeof DetailParser>;

export type DetailMap = Record<string, Omit<Detail, 'name'>>;

export async function readDetail(name: string): Promise<Detail | null> {
  return readDetailFromFile(`${DETAIL_DIRECTORY}${name}.toml`);
}

export async function readDetails(): Promise<Detail[]> {
  const details: Detail[] = [];

  const handleError = (err: unknown) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Unexpected error while reading details', err);
    }
  };

  try {
    const files = await fs.readdir(DETAIL_DIRECTORY);
    for (const file of files) {
      try {
        const detail = await readDetailFromFile(`${DETAIL_DIRECTORY}${file}`);
        if (detail) {
          details.push(detail);
        }
      } catch (err) {
        handleError(err);
      }
    }
  } catch (err) {
    handleError(err);
  }

  return details;
}

export async function readDetailFromFile(
  filename: string
): Promise<Detail | null> {
  try {
    const content = await fs.readFile(filename, 'utf8');
    const table = TOML.parse(content, 1, '\n');
    const detail = DetailParser.parse({
      ...table,
      name: filename.replace(/^.*[\\/]/, '').replace(/\.toml$/, ''),
    });

    return detail;
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Unexpected error while reading detail', err);
    }

    if (err instanceof z.ZodError) {
      throw err;
    }

    return null;
  }
}
