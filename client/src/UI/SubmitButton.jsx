import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 358px;
  display: flex;
  justify-content: center;
  padding: 14px 0;
  border-radius: 6px;
  background: #000;

  margin-top 10px;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  transition: opacity .4s;
  &:hover {
    opacity: .8;
  }
`

const SubmitButton = ({children}) => {
  return (
    <Button type="submit">{children}</Button>
  )
}

export default SubmitButton;