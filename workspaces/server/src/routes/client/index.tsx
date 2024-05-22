import fs from 'node:fs';

import { Hono } from 'hono';

import { INDEX_HTML_PATH } from '../../constants/paths';
import { staticContentCacheMiddleware } from '../../middlewares/cacheControlMiddleware';

const app = new Hono();
app.use(staticContentCacheMiddleware);

const html = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

app.get('*', async (c) => {
  return c.html(html);
});

export { app as clientApp };
