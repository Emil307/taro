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
  padding-top: 20px;
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

const ThemeContent = styled.div``

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
              
            </ThemeContent>
        </Course>
      </Container>
    </>
  )
}

export default ThemePage;