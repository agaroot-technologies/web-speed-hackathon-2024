import {
  Button,
  Divider,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  StackItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useCallback, useEffect, useId, useState } from 'react';
import { useDebounce } from 'react-use';
import { create } from 'zustand';

import type { GetBookListRequestQuery } from '@wsh-2024/schema/src/api/books/GetBookListRequestQuery';

import { useBookList } from '../../features/books/hooks/useBookList';

import { BookDetailModal } from './internal/BookDetailModal';
import { CreateBookModal } from './internal/CreateBookModal';

const BookSearchKind = {
  AuthorId: 'AuthorId',
  AuthorName: 'AuthorName',
  BookId: 'BookId',
  BookName: 'BookName',
} as const;
type BookSearchKind = (typeof BookSearchKind)[keyof typeof BookSearchKind];

const BookModalMode = {
  Create: 'Create',
  Detail: 'Detail',
  None: 'None',
} as const;
type BookModalMode = (typeof BookModalMode)[keyof typeof BookModalMode];

type BookModalState =
  | {
      mode: typeof BookModalMode.None;
      params: object;
    }
  | {
      mode: typeof BookModalMode.Detail;
      params: { bookId: string };
    }
  | {
      mode: typeof BookModalMode.Create;
      params: object;
    };

type BookModalAction = {
  close: () => void;
  openCreate: () => void;
  openDetail: (bookId: string) => void;
};

const useModalStore = create<BookModalState & BookModalAction>()((set) => ({
  ...{
    mode: BookModalMode.None,
    params: {},
  },
  ...{
    close() {
      set({ mode: BookModalMode.None, params: {} });
    },
    openCreate() {
      set({ mode: BookModalMode.Create, params: {} });
    },
    openDetail(bookId) {
      set({ mode: BookModalMode.Detail, params: { bookId } });
    },
  },
}))

export const BookListPage: React.FC = () => {
  const bookListA11yId = useId();

  const formik = useFormik({
    initialValues: {
      kind: BookSearchKind.BookId as BookSearchKind,
      query: '',
    },
    onSubmit() {},
  });

  const [query, setQuery] = useState<GetBookListRequestQuery>({});
  const { data: bookList = [] } = useBookList(query);

  const updateQuery = useCallback((kind: BookSearchKind, query: string) => {
    if (!query) {
      return setQuery({});
    }
    switch (kind) {
      case BookSearchKind.AuthorId: {
        return setQuery({ authorId: query });
      }
      case BookSearchKind.AuthorName: {
        return setQuery({ authorName: query });
      }
      case BookSearchKind.BookId: {
        return setQuery({ bookId: query });
      }
      case BookSearchKind.BookName: {
        return setQuery({ name: query });
      }
    }
  }, []);

  useEffect(() => {
    updateQuery(formik.values.kind, formik.values.query);
  // 検索種別は即時反映したいのでkindだけdepsに指定している
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateQuery, formik.values.kind]);

  useDebounce(() => {
    updateQuery(formik.values.kind, formik.values.query);
  }, 250, [updateQuery, formik.values.query]);

  const modalState = useModalStore()

  return (
    <>
      <Stack height="100%" p={4} spacing={6}>
        <StackItem aria-label="検索セクション" as="section">
          <RadioGroup name="kind" value={formik.values.kind}>
            <Stack direction="row" spacing={4}>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={BookSearchKind.BookId}
              >
                作品 ID
              </Radio>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={BookSearchKind.BookName}
              >
                作品名
              </Radio>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={BookSearchKind.AuthorId}
              >
                作者 ID
              </Radio>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={BookSearchKind.AuthorName}
              >
                作者名
              </Radio>
            </Stack>
          </RadioGroup>

          <Spacer height={2} />

          <Flex gap={2}>
            <Input
              borderColor="gray.400"
              name="query"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="条件を入力"
            />
          </Flex>
        </StackItem>

        <Divider />

        <StackItem
          aria-labelledby={bookListA11yId}
          as="section"
          display="flex"
          flexBasis={0}
          flexDirection="column"
          flexGrow={1}
          flexShrink={1}
          overflow="hidden"
        >
          <Flex align="center" justify="space-between">
            <Text as="h2" fontSize="xl" fontWeight="bold" id={bookListA11yId}>
              作品一覧
            </Text>
            <Button colorScheme="teal" onClick={() => modalState.openCreate()} variant="solid">
              作品を追加
            </Button>
          </Flex>
          <TableContainer flexGrow={1} flexShrink={1} overflowY="auto">
            <Table variant="striped">
              <Thead backgroundColor="white" position="sticky" top={0} zIndex={1}>
                <Tr>
                  <Th w={120}></Th>
                  <Th>作品名</Th>
                  <Th>作者名</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookList.map((book) => (
                  <Tr key={book.id}>
                    <Td textAlign="center" verticalAlign="middle">
                      <Button colorScheme="teal" onClick={() => modalState.openDetail(book.id)} variant="solid">
                        詳細
                      </Button>
                    </Td>
                    <Td verticalAlign="middle">
                      <Text fontWeight="bold">{book.name}</Text>
                      <Text color="gray.400" fontSize="small">
                        {book.id}
                      </Text>
                    </Td>
                    <Td verticalAlign="middle">
                      <Text fontWeight="bold">{book.author.name}</Text>
                      <Text color="gray.400" fontSize="small">
                        {book.author.id}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </StackItem>
      </Stack>

      {modalState.mode === BookModalMode.Detail ? (
        <BookDetailModal isOpen bookId={modalState.params.bookId} onClose={() => modalState.close()} />
      ) : null}
      {modalState.mode === BookModalMode.Create ? <CreateBookModal isOpen onClose={() => modalState.close()} /> : null}
    </>
  );
};
