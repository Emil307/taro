import React, { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { useThemes } from '../hooks/useThemes';
import { useContent } from '../hooks/useContent';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ThemesList from '../components/ThemesList';
import ThemeForm from '../UI/ThemeForm';
import AddTheme from '../UI/AddTheme';

const ThemesUl = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  border-radius: 40px 0 0 40px;
  padding-top: 15px;
  padding-left: 30px;
  padding-right: 20px;
  padding-bottom: 20px;
  background: #F7F7F7;
  overflow: hidden;
  &:hover {
    width: calc(40% + 8px);
    overflow: scroll;
    overflow-x: hidden;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background: #eee;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #ddd;
  }
`

const ThemeContent = styled.div`
  width: calc(60% - 15px);
  padding: 20px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
}
`

const ThemeTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
`

const Title = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 40px;
  margin-bottom: -20px;
`

const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.2;
  margin-top: 32px;
`

const Image = styled.img`
  width: 100%;
  margin-top: 32px;
`

const Video = styled.iframe`
  width: 100%;
  height: 350px;
  border-radius: 20px;
  border: none;
  margin-top: 32px;
`

function ThemePage() {
  const [formActive, setFormActive] = useState(false);
  const [role, setRole] = useState(useSelector(state => state.role));

  const {id} = useParams();
  const themes = useThemes().themes;
  const content = useContent().content;
  let theme = {};

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, [])
 
  for (let i = 0; i < themes.length; i++) {
    if (themes[i].id == id) {
      theme = themes[i];
      break;
    }
  }

  return (
    <>
      <Layout>
        <ThemesUl>
          <ThemesList/>
          {role == "admin" ? <AddTheme href='/create-theme'/> : <></>}
          <ThemeForm active={formActive} setActive={setFormActive}/>
        </ThemesUl>
        <ThemeContent>
          {theme.videoUrl
          ?
          <Video src={theme.videoUrl} allow="autoplay; fullscreen; picture-in-picture; encrypted-media;" allowfullscreen></Video>
          :
          <></>
          }
          <ThemeTitle>{theme.title}</ThemeTitle>
          {content && content.map(item => 
            <li key={item.id}>
              {item.type == 'title' ? <Title>{item.content}</Title>:
              item.type == 'text' ? <Text>{item.content}</Text> :
              item.type == 'img' ? <Image src={item.content}/> :
              <Video src={item.content} allow="autoplay; fullscreen; picture-in-picture; encrypted-media;" allowfullscreen></Video>
              }
            </li>
          )}
        </ThemeContent>
      </Layout>
    </>
  )
}

export default ThemePage;
