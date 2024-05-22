import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { episode } from '../../models';

export const GetEpisodeListResponseSchema = createSelectSchema(episode)
  .pick({
    chapter: true,
    id: true,
    name: true,
  })
  .array();

export type GetEpisodeListResponse = z.infer<typeof GetEpisodeListResponseSchema>;
