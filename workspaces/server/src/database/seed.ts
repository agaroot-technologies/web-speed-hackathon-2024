import fs from 'node:fs/promises';
import zlib from 'node:zlib';

import { DATABASE_PATH, DATABASE_SEED_PATH } from '../constants/paths';

import { initializeDatabase } from './drizzle';

export const seeding = async () => {
  const seed = await fs.readFile(DATABASE_SEED_PATH);
  await fs.writeFile(DATABASE_PATH, zlib.gunzipSync(seed));

  initializeDatabase();
  console.log('Finished seeding');
};
