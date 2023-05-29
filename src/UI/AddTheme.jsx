import React from 'react';
import styled from "styled-components";

const Link = styled.a`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px 0;
  border-radius: 15px;
  border: 2px #0F0C09 solid;
  margin-top: 15px;

  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #0F0C09;
`

function AddTheme({ href }) {
    return (
      <Link href={href}>Добавить тему</Link>
    );
}

export default AddTheme;
