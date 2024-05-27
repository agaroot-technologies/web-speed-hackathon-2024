import React, { useEffect, useId, useState } from 'react';
import styled from 'styled-components';

import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';
import { Dialog } from './Dialog';

const _Content = styled.section`
  white-space: pre-line;
`;

export const Footer: React.FC = () => {
  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const [term, setTerm] = useState<string>("")
  const [contact, setContact] = useState<string>("")
  const [question, setQuestion] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [overview, setOverview] = useState<string>("")

  useEffect(() => {
    // NOTE: Promise.allで取得するとコネクションを占有してしまいほかのリソースの取得が遅れるため、直列で取得する
    const fetchContent = async () => {
      await fetch('/assets/term.txt', {priority: "low"}).then((res) => res.text()).then(setTerm);
      await fetch('/assets/contact.txt', {priority: "low"}).then((res) => res.text()).then(setContact);
      await fetch('/assets/question.txt', {priority: "low"}).then((res) => res.text()).then(setQuestion);
      await fetch('/assets/company.txt', {priority: "low"}).then((res) => res.text()).then(setCompany);
      await fetch('/assets/overview.txt', {priority: "low"}).then((res) => res.text()).then(setOverview);
    }

    fetchContent()
  }, [])

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <Dialog
            label="利用規約"
            content={
              // FIXME: ContentはDialog側に持たせるべき
              <_Content aria-labelledby={termDialogA11yId} role="dialog">
                <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
                  利用規約
                </Text>
                <Spacer height={Space * 1} />
                <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
                  {term}
                </Text>
              </_Content>
            }
          />
          <Dialog
            label="お問い合わせ"
            content={
              <_Content aria-labelledby={contactDialogA11yId} role="dialog">
                <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
                  お問い合わせ
                </Text>
                <Spacer height={Space * 1} />
                <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
                  {contact}
                </Text>
              </_Content>
            }
          />
          <Dialog
            label="Q&A"
            content={
              <_Content aria-labelledby={questionDialogA11yId} role="dialog">
                <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
                  Q&A
                </Text>
                <Spacer height={Space * 1} />
                <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
                  {question}
                </Text>
              </_Content>
            }
          />
          <Dialog
            label="運営会社"
            content={
              <_Content aria-labelledby={companyDialogA11yId} role="dialog">
                <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
                  運営会社
                </Text>
                <Spacer height={Space * 1} />
                <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
                  {company}
                </Text>
              </_Content>
            }
          />
          <Dialog
            label="Cyber TOONとは"
            content={
              <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
                <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
                  Cyber TOONとは
                </Text>
                <Spacer height={Space * 1} />
                <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
                  {overview}
                </Text>
              </_Content>
            }
          />
        </Flex>
      </Flex>
    </Box>
  );
};
