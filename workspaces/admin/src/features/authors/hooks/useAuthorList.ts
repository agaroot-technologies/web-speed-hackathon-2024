import { useQuery } from '@tanstack/react-query';

import type { GetAuthorListRequestQuery } from '@wsh-2024/schema/src/api/authors/GetAuthorListRequestQuery';

import { authorApiClient } from '../apiClient/authorApiClient';


export const useAuthorList = (query: GetAuthorListRequestQuery) => {
  return useQuery({
    queryFn: async ({ queryKey: [, options] }) => {
      return authorApiClient.fetchList(options);
    },
    queryKey: authorApiClient.fetchList$$key({ query }),
  });
};
