import { Suspense, useId, useRef } from 'react';
import type { FC } from 'react';

import { BookCard } from '../../../features/book/components/BookCard';
import { useRelease } from '../../../features/release/hooks/useRelease';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { useInViewPort } from '../../../foundation/hooks/useInViewPort';
import { Color, Space, Typography } from '../../../foundation/styles/variables';
import { getDayOfWeekStr } from '../../../lib/date/getDayOfWeekStr';

const PAGE_SIZE = 10;

const ReleaseList: FC = () => {
  const todayStr = getDayOfWeekStr(new Date());
  const { data, isValidating, setSize, size } = useRelease({ params: { dayOfWeek: todayStr } }, PAGE_SIZE);
  const releaseList = data?.flatMap(release => release.books) ?? [];
  const isReachingEnd = (data?.at(-1)?.books?.length ?? 0) < PAGE_SIZE;

  const anchorRef = useRef<HTMLDivElement>(null);
  useInViewPort(anchorRef, async entry => {
    if (!entry.isIntersecting || isValidating || isReachingEnd) return;

    setSize(size + 1);
  });

  return (
    <Flex align="stretch" gap={Space * 2} justify="flex-start">
      {releaseList.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      <div ref={anchorRef} style={{ minHeight: '100%', minWidth: '1px', opacity: 0 }} />
    </Flex>
  );
};

const ReleaseListWithSuspense: FC = () => {
  const todayA11yId = useId();

  return (
    <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
      <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
        本日更新
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
        <Suspense fallback={null}>
          <ReleaseList />
        </Suspense>
      </Box>
    </Box>
  );
};

export { ReleaseListWithSuspense as ReleaseList };
