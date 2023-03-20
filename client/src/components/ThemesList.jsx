import React from "react";
import styled from "styled-components";
import { useThemes } from "../hooks/useThemes";
import Theme from './Theme';

const List = styled.div`
  width: 100%;
`

function ThemesList() {
  const themes = useThemes().themes;

  return (
    <List>
      {themes && themes.map(theme =>
        <Theme theme={theme} key={theme.id}/>
      )}
    </List>
  )
}

export default ThemesList;
