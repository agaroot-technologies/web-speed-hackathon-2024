import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { author } from '../../models';

export const GetAuthorListResponseSchema = createSelectSchema(author)
  .pick({
    description: true,
    id: true,
    name: true,
  })
  .array();

export type GetAuthorListResponse = z.infer<typeof GetAuthorListResponseSchema>;
