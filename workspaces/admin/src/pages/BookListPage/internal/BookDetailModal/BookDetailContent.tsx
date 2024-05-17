import { Box, Button, Flex, Image, Stack, StackItem, Text } from '@chakra-ui/react';
import { useCallback } from 'react';

import type { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';

import { useDeleteBook } from '../../../../features/books/hooks/useDeleteBook';
import { getImageSrc } from '../../../../lib/image/getImageSrc';

type BookDetailContentProps = {
  book: GetBookResponse;
  onCloseDialog: () => void;
  onEdit: () => void;
};

export const BookDetailContent: React.FC<BookDetailContentProps> = ({ book, onCloseDialog, onEdit }) => {
  const { mutate: deleteBook } = useDeleteBook();

  const handleEditClick = useCallback(() => {
    onEdit();
  }, [onEdit]);

  const handleDeleteClick = useCallback(() => {
    deleteBook(
      {
        bookId: book.id,
      },
      {
        onSuccess: () => {
          onCloseDialog();
        },
      },
    );
}, [book, deleteBook, onCloseDialog]);

  return (
    <Box aria-label="作品詳細" as="section">
      <Flex align="center" pb={2}>
        <Image
          alt={book.name}
          aspectRatio="3 / 4"
          height={256}
          objectFit="cover"
          width={192}
          {...getImageSrc({ imageId: book.image.id })}
        />
        <Stack p={4} spacing={2}>
          <StackItem>
            <Text color="gray.600" fontSize="sm">
              {book.nameRuby}
            </Text>
          </StackItem>
          <StackItem>
            <Text fontWeight="bold">{book.name}</Text>
          </StackItem>
          <StackItem>
            <Text>{book.description}</Text>
          </StackItem>
        </Stack>
      </Flex>
      <Flex gap={4} justify="flex-end" pb={4}>
        <Button colorScheme="teal" onClick={handleEditClick} variant="solid">
          編集
        </Button>
        <Button onClick={handleDeleteClick}>削除</Button>
      </Flex>
    </Box>
  );
};
