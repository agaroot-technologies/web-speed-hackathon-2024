import useSWRInfinite from 'swr/infinite';

import { rankingApiClient } from '../apiClient/rankingApiClient';

export function useRankingList(limit: number) {
  return useSWRInfinite(
    index => rankingApiClient.fetchList$$key({ query: { limit, offset: index * limit }}),
    rankingApiClient.fetchList,
    { suspense: true },
  );
}
