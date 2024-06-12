import path from 'node:path';

import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

import { IMAGES_PATH } from '../../constants/paths';
import { staticContentCacheMiddleware } from '../../middlewares/cacheControlMiddleware';

const app = new Hono();
app.use(staticContentCacheMiddleware);

app.use(
  '/images/*',
  serveStatic({
    root: path.relative(process.cwd(), IMAGES_PATH),
    rewriteRequestPath: path => path.replace(/^\/images/, ''),
  }),
);

export { app as imageApp };
