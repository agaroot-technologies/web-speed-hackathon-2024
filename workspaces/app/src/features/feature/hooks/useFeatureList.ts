import useSWRInfinite from 'swr/infinite';

import { featureApiClient } from '../apiClient/featureApiClient';

export function useFeatureList(limit: number) {
  return useSWRInfinite(
    index => featureApiClient.fetchList$$key({ query: { limit, offset: index * limit }}),
    featureApiClient.fetchList,
    { suspense: true },
  );
}
