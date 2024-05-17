import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Space } from '../../foundation/styles/variables';

import { CoverSection } from './internal/CoverSection';
import { PickupList } from './internal/PickupList';
import { RankingList } from './internal/RankingList';
import { ReleaseList } from './internal/ReleaseList'

export const TopPage: React.FC = () => {
  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />
      </Box>
      <Box as="main" maxWidth="100%" width="100%">
        <PickupList />
        <Spacer height={Space * 2} />
        <RankingList />
        <Spacer height={Space * 2} />
        <ReleaseList />
      </Box>
    </Flex>
  );
};
