import { Suspense, useId, useRef } from 'react';
import type { FC } from 'react';

import { RankingCard } from '../../../features/ranking/components/RankingCard';
import { useRankingList } from '../../../features/ranking/hooks/useRankingList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { useInViewPort } from '../../../foundation/hooks/useInViewPort';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

const PAGE_SIZE = 10;

const RankingList: FC = () => {
  const { data, isValidating, setSize, size } = useRankingList(PAGE_SIZE);
  const rankingList = data?.flat() ?? [];
  const isReachingEnd = (data?.at(-1)?.length ?? 0) < PAGE_SIZE;

  const anchorRef = useRef<HTMLDivElement>(null);
  useInViewPort(anchorRef, async entry => {
    if (!entry.isIntersecting || isValidating || isReachingEnd) return;

    setSize(size + 1);
  });

  return (
    <Flex align="center" as="ul" direction="column" height={775} justify="flex-start" overflow='auto'>
      {rankingList.map((ranking) => (
        <RankingCard key={ranking.id} book={ranking.book} />
      ))}
      <div ref={anchorRef} style={{ minHeight: '1px', minWidth: '100%', opacity: 0 }} />
    </Flex>
  );
};

const RankingListWithSuspense: FC = () => {
  const rankingA11yId = useId();

  return (
    <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
      <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
        ランキング
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
        <Suspense fallback={null}>
          <RankingList />
        </Suspense>
      </Box>
    </Box>
  );
};

export { RankingListWithSuspense as RankingList };
