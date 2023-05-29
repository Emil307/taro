import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.2;

`

const Text = ({children}) => {
  return (
    <Paragraph>{children}</Paragraph>
  )
}

export default Text;