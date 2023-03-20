import React from 'react';
import styled from 'styled-components';

const Input = styled.textarea`
  width: calc(100% - 4px);
  padding-left: 4px;
  padding-bottom: 10px;
  margin-bottom: 33px;
  border-bottom: 1px rgba(0, 0, 0, .2) solid;

  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000;
`

const TextArea = ({placeholder, name, type}) => {
  return (
    <Input placeholder={placeholder} name={name} type={type}></Input>
  )
}

export default TextArea;