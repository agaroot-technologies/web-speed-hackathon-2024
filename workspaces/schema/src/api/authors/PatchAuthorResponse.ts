import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { author, image } from '../../models';

export const PatchAuthorResponseSchema = createSelectSchema(author)
  .pick({
    description: true,
    id: true,
    name: true,
  })
  .extend({
    image: createSelectSchema(image).pick({
      alt: true,
      id: true,
    }),
  });

export type PatchAuthorResponse = z.infer<typeof PatchAuthorResponseSchema>;
