import { useInfiniteQuery } from '@tanstack/react-query';

import type { GetBookListRequestQuery } from '@wsh-2024/schema/src/api/books/GetBookListRequestQuery';

import { bookApiClient } from '../apiClient/bookApiClient';

export const useBookList = (query: GetBookListRequestQuery = {}, limit: number = 10) => {
  return useInfiniteQuery({
    // eslint-disable-next-line sort/object-properties
    queryFn: async ({ pageParam, queryKey: [, options] }) => {
      return bookApiClient.fetchList({
        query: {
          ...options.query,
          limit,
          offset: pageParam * limit,
        }
      });
    },
    queryKey: bookApiClient.fetchList$$key({ query }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  });
};
