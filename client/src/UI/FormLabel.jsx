import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  width: calc(46% - 8px);
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 10px;
  border-bottom: 1px rgba(0, 0, 0, .2) solid;
  
  &:focus {
    outline: none;
  }
`

const FormLabel = ({children, htmlFor}) => {
  return (
    <Label htmlFor={htmlFor}>{children}</Label>
  )
}

export default FormLabel;