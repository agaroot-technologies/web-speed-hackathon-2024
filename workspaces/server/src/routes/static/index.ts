import path from 'node:path';

import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';

import { CLIENT_STATIC_PATH } from '../../constants/paths';
import { staticContentCacheMiddleware } from '../../middlewares/cacheControlMiddleware';

const app = new Hono();
app.use(staticContentCacheMiddleware);

app.use(
  '*',
  async (c, next) => {
    await next();
    if (c.req.url.endsWith('.js')) {
      c.res.headers.append('Content-Encoding', 'br')
    }
  },
  serveStatic({
    root: path.relative(process.cwd(), CLIENT_STATIC_PATH),
  }),
);

export { app as staticApp };
