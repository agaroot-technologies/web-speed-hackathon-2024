import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { episode, episodePage, image } from '../../models';

export const GetEpisodeResponseSchema = createSelectSchema(episode)
  .pick({
    chapter: true,
    description: true,
    id: true,
    name: true,
    nameRuby: true,
  })
  .extend({
    image: createSelectSchema(image).pick({
      alt: true,
      id: true,
    }),
    pages: createSelectSchema(episodePage)
      .pick({
        id: true,
        page: true,
      })
      .extend({
        image: createSelectSchema(image).pick({
          alt: true,
          id: true,
        }),
      })
      .array(),
  });

export type GetEpisodeResponse = z.infer<typeof GetEpisodeResponseSchema>;
