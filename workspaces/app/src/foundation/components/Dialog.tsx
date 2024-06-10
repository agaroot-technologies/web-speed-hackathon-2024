import { Close } from '@mui/icons-material'
import { useState } from 'react';
import styled from 'styled-components';

import { Color, Space } from '../styles/variables';

import { Button } from './Button';

const _Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const _Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - ${Space * 8}px);
  max-width: 480px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
`;

const _Container = styled.div`
  padding: ${Space * 2}px;
  border-radius: 4px;
  background-color: ${Color.MONO_A};
  height: 540px;
  overflow: scroll;
`;

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _CloseButton = styled(Button)`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  position: absolute;
  top: -${Space * 5}px;
  left: -${Space * 1}px;
`;

export const Dialog: React.FC<{
  label: string
  content: JSX.Element
}> = ({
  label,
  content
}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    document.body.style.overflow = 'hidden'
    setOpen(true)
  }

  const handleClose = () => {
    document.body.style.overflow = 'initial';
    setOpen(false)
  }

  return (
    <>
    <_Button onClick={handleOpen}>
      {label}
    </_Button>
    {open &&
      <_Overlay>
        <_Wrapper>
          <_CloseButton onClick={handleClose}>
            <Close style={{ color: Color.MONO_A, height: 32, width: 32 }} />
          </_CloseButton>
          <_Container>{content}</_Container>
        </_Wrapper>
      </_Overlay>
    }
    </>
  )
};
