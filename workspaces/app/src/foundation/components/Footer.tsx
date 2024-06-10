import type { FC } from 'react';

import { Color, Space } from '../styles/variables';

import { Box } from './Box';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';
import { Flex } from './Flex';

const assets = [
  { title: "利用規約", src: "/assets/term.txt" },
  { title: "お問い合わせ", src: "/assets/contact.txt" },
  { title: "Q&A", src: "/assets/question.txt" },
  { title: "運営会社", src: "/assets/company.txt" },
  { title: "Cyber TOONとは", src: "/assets/overview.txt" },
]

export const Footer: FC = () => {
  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          {assets.map(asset => (
            <Dialog
              key={asset.title}
              content={
                <DialogContent
                  {...asset}
                />
              }
              label={asset.title}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
