import fs from 'node:fs/promises';

import type { ReadImageFunction } from './ReadImageFunction';

export const readWebp: ReadImageFunction = async (imagePath) => {
  const { default: sharp } = await import('sharp');
  const imageBinary = await fs.readFile(imagePath);

  return sharp(imageBinary)
    .ensureAlpha()
    .raw()
    .toBuffer({
      resolveWithObject: true,
    })
    .then(({ data, info }) => {
      return {
        colorSpace: 'srgb',
        data: new Uint8ClampedArray(data),
        height: info.height,
        width: info.width,
      };
    });
};
