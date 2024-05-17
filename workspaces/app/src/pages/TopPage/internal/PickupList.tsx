import { Suspense, useId } from 'react';
import type { FC } from 'react';

import { FeatureCard } from '../../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../../features/feature/hooks/useFeatureList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

const PickupList: FC = () => {
  const { data: featureList } = useFeatureList({ query: {} });

  return (
    <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
      {featureList.map((feature) => (
        <FeatureCard key={feature.id} book={feature.book} />
      ))}
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
