import { Suspense, useId, useRef } from 'react';
import type { FC } from 'react';

import { FeatureCard } from '../../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../../features/feature/hooks/useFeatureList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { useInViewPort } from '../../../foundation/hooks/useInViewPort';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

const PAGE_SIZE = 10;

const PickupList: FC = () => {
  const { data, isValidating, setSize, size } = useFeatureList(PAGE_SIZE);
  const featureList = data?.flat() ?? [];
  const isReachingEnd = (data?.at(-1)?.length ?? 0) < PAGE_SIZE

  const anchorRef = useRef<HTMLDivElement>(null);
  useInViewPort(anchorRef, async entry => {
    if (!entry.isIntersecting || isValidating || isReachingEnd) return;

    setSize(size + 1);
  });

  return (
    <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
      {featureList.map((feature) => (
        <FeatureCard key={feature.id} book={feature.book} />
      ))}
      <div ref={anchorRef} style={{ minHeight: '100%', minWidth: '1px', opacity: 0 }} />
    </Flex>
  );
};

const PickupListWithSuspense: FC = () => {
  const pickupA11yId = useId();

  return (
    <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
      <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
        ピックアップ
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
        <Suspense fallback={<Box height={206} />}>
          <PickupList />
        </Suspense>
      </Box>
    </Box>
  );
};

export { PickupListWithSuspense as PickupList };
