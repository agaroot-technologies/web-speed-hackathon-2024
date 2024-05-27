import useSWRInfinite from 'swr/infinite';

import { releaseApiClient } from '../apiClient/releaseApiClient';

export function useRelease(options: Parameters<typeof releaseApiClient.fetch>[0], limit: number) {
  return useSWRInfinite(
    index => releaseApiClient.fetch$$key({ params: { ...options.params }, query: { limit, offset: index * limit } }),
    releaseApiClient.fetch,
    { suspense: true },
  );
}
