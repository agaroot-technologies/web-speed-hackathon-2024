import { useQuery } from '@tanstack/react-query';

import type { GetBookListRequestQuery } from '@wsh-2024/schema/src/api/books/GetBookListRequestQuery';

import { bookApiClient } from '../apiClient/bookApiClient';

export const useBookList = (query: GetBookListRequestQuery = {}) => {
  return useQuery({
    queryFn: async ({ queryKey: [, options] }) => {
      return bookApiClient.fetchList(options);
    },
    queryKey: bookApiClient.fetchList$$key({ query }),
  });
};
