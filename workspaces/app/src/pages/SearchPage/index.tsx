import { useCallback, useId, useState } from 'react';
import { useDebounce } from 'react-use';

import { Box } from '../../foundation/components/Box';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { Input } from './internal/Input';
import { SearchResult } from './internal/SearchResult';

const SearchPage: React.FC = () => {
  const searchResultsA11yId = useId();

  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const isTyping = keyword !== searchKeyword;

  const onChangedInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    [setKeyword],
  );

  useDebounce(() => {
    setSearchKeyword(keyword);
  }, 250, [keyword]);

  return (
    <Box px={Space * 2}>
      <Input onChange={onChangedInput} />
      <Box aria-labelledby={searchResultsA11yId} as="section" maxWidth="100%" py={Space * 2} width="100%">
        <Text color={Color.MONO_100} id={searchResultsA11yId} typography={Typography.NORMAL20} weight="bold">
          検索結果
        </Text>
        {(searchKeyword !== '' && !isTyping) && <SearchResult keyword={searchKeyword} />}
      </Box>
    </Box>
  );
};

export { SearchPage };
