import React from 'react';
import { useSelector } from 'react-redux';
import { useThemes } from '../hooks/useThemes';
import { useContent } from '../hooks/useContent';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Sidebar from '../components/SideBar';
import ContentList from '../components/ContentList';
import styled from "styled-components";
import EditorAdder from '../components/EditorAdder';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`

const ThemeTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  &:focus {
    outline: none;
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; 
`

const Content = styled.div`
  width: calc(100% - 80px);
  max-width: 800px;
  height: calc(100% - 80px);
  padding: 40px;
  margin: 0 auto;
`

const EditTheme = () => {
  const themes = useThemes().themes;
  const content = useContent().content;

  const currentItem = useSelector(state => state.currentItem);
  const activeSidebar = useSelector(state => state.activeSidebar);

  const {id} = useParams();
  let theme = {};

  for (let i = 0; i < themes.length; i++) {
    if (themes[i].id == id) {
      theme = themes[i];
      break;
    }
  }

  return (
    <Layout>
      <Container>
          <Content>
            <EditorAdder/>
            <Sidebar active={activeSidebar} setActive={!activeSidebar} item={currentItem}/>
            <ThemeTitle>{theme.title}</ThemeTitle>
            <ContentList content={content}/>
          </Content>
      </Container>
    </Layout>
  )
}

export default EditTheme;