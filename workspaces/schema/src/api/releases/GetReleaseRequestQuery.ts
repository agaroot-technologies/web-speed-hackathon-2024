import { z } from 'zod';

export const GetReleaseRequestQuerySchema = z.object({
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});

export type GetReleaseRequestQuery = z.infer<typeof GetReleaseRequestQuerySchema>;

