import { type FC, useId, useEffect, useState } from "react"
import styled from "styled-components";


import { Color, Space, Typography } from "../styles/variables";

import { Spacer } from './Spacer';
import { Text } from './Text';


const _Content = styled.section`
  white-space: pre-line;
`;

type DialogContentProps = {
  title: string;
  src: string;
}

export const DialogContent: FC<DialogContentProps> = ({
  title,
  src,
}) => {
  const dialogA11yId = useId();

  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchContent = async () => {
      await fetch(src).then(res => res.text()).then(setContent)
    }

    fetchContent()
  }, [src])

  return (
    <_Content aria-labelledby={dialogA11yId} role="dialog">
      <Text as="h2" color={Color.MONO_100} id={dialogA11yId} typography={Typography.NORMAL16}>
        {title}
      </Text>
      <Spacer height={Space * 1} />
      {content && (
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {content}
        </Text>
      )}
    </_Content>
  )
}
