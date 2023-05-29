import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupsIcon from '@mui/icons-material/Groups';
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

const Content = styled.div`
  width: calc(100% - 97px - 30px);
  border-radius: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
`

const Layout = ({children}) => {
  const [role, setRole] = useState(useSelector(state => state.role));

  const dispatch = useDispatch();

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, [])

  function logoutFunc() {
    dispatch({type: "SET_ISLOGIN", payload: false});
    localStorage.clear();
  }

  return (
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
          {role === 'admin' ? 
            <a href='/users'>
              <GroupsIcon
                sx={{
                  fontSize: 36,
                  color: "rgba(89, 61, 41, 0.85)",
                }}/>
            </a> : <></>
          }
          <a href='/'>
            <button onClick={logoutFunc}>
              <LogoutIcon sx={{
                fontSize: 36,
                color: "rgba(89, 61, 41, 0.85)",
              }}/>
          </button>
          </a>
        </Sidebar>
        <Content>
          {children}
        </Content>
    </Container>
  )
}

export default Layout