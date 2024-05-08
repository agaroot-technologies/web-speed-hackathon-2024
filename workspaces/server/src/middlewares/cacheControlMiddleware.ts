import { createMiddleware } from 'hono/factory';

export const cacheControlMiddleware = createMiddleware(async (c, next) => {
  await next();
  c.res.headers.append('Cache-Control', 'private');
  c.res.headers.append('Cache-Control', 'no-store');
});

export const staticContentCacheMiddleware = createMiddleware(async (c, next) => {
  await next()
  const day = 60 * 60 * 24
  c.res.headers.append('Cache-Control', `max-age=${day}`)
})
