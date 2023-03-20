import React from 'react';
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 15px 0;
  border-radius: 15px;
  border: 2px #0F0C09 solid;
  margin-top: 15px;
`

const Text = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: #0F0C09;
`

function AddTheme({ onClick }) {
    return (
      <Button onClick={onClick}><Text>Добавить тему</Text></Button>
    );
}

export default AddTheme;
