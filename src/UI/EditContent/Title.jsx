import React from 'react';
import styled from 'styled-components';

const H2 = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;

  
`

const Title = ({children}) => {
  return (
    <H2>{children}</H2>
  )
}

export default Title;