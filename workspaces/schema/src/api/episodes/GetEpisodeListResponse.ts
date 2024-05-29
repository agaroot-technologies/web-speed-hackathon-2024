import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { image, episode } from '../../models';

export const GetEpisodeListResponseSchema = createSelectSchema(episode)
  .pick({
    chapter: true,
    id: true,
    name: true,
    description: true
  })
  .extend({
    image: createSelectSchema(image).pick({
      alt: true,
      id: true,
    }),
  })
  .array();

export type GetEpisodeListResponse = z.infer<typeof GetEpisodeListResponseSchema>;
