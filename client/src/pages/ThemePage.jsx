import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useThemes } from '../hooks/useThemes';
import { RoleContext } from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ThemesList from '../components/ThemesList';
import ThemeForm from '../UI/ThemeForm';
import AddTheme from '../UI/AddTheme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';

const Container = styled.div`
  width: calc(100vw - 30px);
  height: calc(100vh - 30px);
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0F0C09;
  z-index: 100;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`

const Sidebar = styled.div`
  width: 97px;
  height: calc(100% - 96px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 0;
  padding-left: 48px;
`

const Course = styled.div`
  width: calc(100% - 97px - 30px);
  border-radius: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
`

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
`

const Video = styled.iframe`
  width: 100%;
  height: 350px;
  border-radius: 20px;
`

const Title = styled.h2`
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  margin-top: 20px;
`

function ThemePage() {
  const [formActive, setFormActive] = useState(false);
  const [role, setRole] = useState(useSelector(state => state.role));

  const {id} = useParams();
  const themes = useThemes().themes;
  let theme = {};

  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, [])
 
  for (let i = 0; i < themes.length; i++) {
    if (themes[i].id == id) {
      theme = themes[i];
      break;
    }
  }

  function logoutFunc() {
    dispatch({type: "SET_ISLOGIN", payload: false});
    localStorage.clear();
  }

  const content = {__html: theme.content};

  return (
    <>
      <Container>
        <Sidebar>
          <a href='/'>
            <ArrowBackIcon
              sx={{
                fontSize: 36,
                color: "rgba(89, 61, 41, 0.85)",
              }}
            />
          </a>
          <a href='/'>
            <button onClick={logoutFunc}>
              <LogoutIcon sx={{
                fontSize: 36,
                color: "rgba(89, 61, 41, 0.85)",
              }}/>
          </button>
          </a>
        </Sidebar>
        <Course>
            <ThemesUl>
              <ThemesList/>
              {role == "admin" ? <AddTheme onClick={() => setFormActive(true)}/> : <></>}
              <ThemeForm active={formActive} setActive={setFormActive}/>
            </ThemesUl>
            <ThemeContent>
              {theme.videoUrl
              ?
              <Video src="https://www.youtube.com/embed/F3Lu0JZeCak" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></Video>
              :
              <></>
              }
              <Title>{theme.title}</Title>
              <div dangerouslySetInnerHTML={content}></div>
            </ThemeContent>
        </Course>
      </Container>
    </>
  )
}

export default ThemePage;
