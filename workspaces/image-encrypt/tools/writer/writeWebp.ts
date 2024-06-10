import fs from 'node:fs/promises';
import path from 'node:path';

import type { WriteImageFunction } from './WriteImageFunction';

export const writeWebp: WriteImageFunction = async ({ filepath, imageData }) => {
  const { default: sharp } = await import('sharp');
  const buffer = await sharp(imageData.data, {
    raw: {
      channels: 4,
      height: imageData.height,
      width: imageData.width,
    },
  })
    .webp({ effort: 6 })
    .toBuffer();

  await fs.mkdir(path.dirname(filepath), { recursive: true }).catch(() => {});
  await fs.writeFile(filepath, buffer);
};
