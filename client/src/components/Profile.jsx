import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import ThemesList from './ThemesList';
import AddTheme from "../UI/AddTheme.jsx";
import ThemeForm from "../UI/ThemeForm.jsx";
import { RoleContext } from './Header.jsx';
import { NameContext } from './Header.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';

const Container = styled.div`
  width: calc(100vw - 30px);
  height: calc(100vh - 30px);
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0F0C09;
  z-index: 1000;
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

const ThemeContent = styled.div``

const Profile = ({active, setActive, logout, children}) => {
  const [formActive, setFormActive] = useState(false);

  let role = useContext(RoleContext);
  const name = useContext(NameContext);
  function logoutFunc() {
    window.location.reload()
    logout();
    setActive(false);
    localStorage.clear();
  }

  useEffect(() => {
    role = localStorage.getItem('role');
  }, [])

  function closeProfile() {
    setActive(false);
    localStorage.removeItem('profile');
  }

  return (
    <>
      {active
      ?
      <Container>
        <Sidebar>
          <button onClick={closeProfile}>
            <ArrowBackIcon
              sx={{
                fontSize: 36,
                color: "rgba(89, 61, 41, 0.85)",
              }}
            />
          </button>
          <button onClick={logoutFunc}>
            <LogoutIcon sx={{
              fontSize: 36,
              color: "rgba(89, 61, 41, 0.85)",
            }}/>
          </button>
        </Sidebar>
        <Course>
            <ThemesUl>
              <ThemesList/>
              {role == "admin" ? <AddTheme onClick={() => setFormActive(true)}/> : <></>}
              <ThemeForm active={formActive} setActive={setFormActive}/>
            </ThemesUl>
            <ThemeContent>
              {children}
            </ThemeContent>
        </Course>
      </Container>
      :
      <></>
      }
    </>
  )
}

export default Profile;
