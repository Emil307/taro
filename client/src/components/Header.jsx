import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Popup from '../UI/popup/Popup';
import FormInput from '../UI/FormInput';
import SubmitButton from '../UI/SubmitButton';
import Profile from './Profile.jsx';
import { useDispatch, useSelector } from 'react-redux';

const Head = styled.header`
  position: absolute;
  top: 0;
  left: calc((100% - 1170px) / 2);
  width: 100%;
  max-width: 1170px;
  height: 83px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  width: 80px;
  height: 37px;
  border-radius: 10px;
  background-color: #212121;
  color: #fff;
  cursor: pointer;
`

const ErrorMessage = styled.p`
 color: red;
 margin-top: 10px; 
`

const Logo = styled.h1``

export const RoleContext = React.createContext();
export const NameContext = React.createContext();

const Header = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');

  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState('user');

  const [error, setError] = useState('');
  const [loginPopupActive, setLoginPopupActive] = useState(false);
  const [registrationPopupActive, setRegistrationPopupActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector(state => state.token);

  function loginForm(event) {
    const formData = new FormData(event.target);

    event.preventDefault();
    fetch("http://127.0.0.1:8000/auth/token/login/", {
      method : 'POST',
      body : formData
    })
    .then (response => response.text())
    .then (response => {
      response = JSON.parse(response);
      if (response.auth_token) {
        // console.log("Token " + response.auth_token)
        getUser("Token " + response.auth_token);
      }
    })
  }

  function getUser(token) {
    fetch("http://127.0.0.1:8000/api/v1/auth/users/me", {
      method : 'GET',
      headers : {"Authorization": token}
    })
    .then (response => response.text())
    .then (response => {
      response = JSON.parse(response);
      if (response) {
        dispatch({type: "UPDATE_TOKEN", payload: token});
        dispatch({type: "SET_ROLE", payload: response.role});
        setRole(response.role);
        setIsLogin(true);
        setLoginPopupActive(false);
      }
    })
  }

  function registrationForm(event) {
    const formData = new FormData(event.target);

    event.preventDefault();
    fetch("http://127.0.0.1:8000/api/v1/auth/users/", {
      method : 'POST',
      body : formData
    })
    .then (response => response.text())
    .then (response => {
      response = JSON.parse(response);
      if (typeof response.id !== 'undefined') {
        setIsLogin(true);
        setRegistrationPopupActive(false);
        console.log(response);
      } else if (response.email) {
        setError(response.email[0]);
      } else if (response.password) {
        setError(response.password[0]);
      }
    })
  }

  function closeLogin() {
    setError('');
    setLoginPopupActive(false);
    setRegistrationPopupActive(true);
  }

  function closeRegistration() {
    setError('');
    setLoginPopupActive(true);
    setRegistrationPopupActive(false);
  }

  return (
    <>
      <Head>
        <a href='/'></a>
        {isLogin 
          ?
          <ul>
            <li>
              <Button onClick={() => setProfileActive(true)}>в профиль</Button>
            </li>
          </ul>
          :
          <ul>
            <Button onClick={() => setLoginPopupActive(true)}>войти</Button>
          </ul>
        }
      </Head>
      <Popup active={loginPopupActive} setActive={setLoginPopupActive}>
        <form name="form-reg" className="loginRight" onSubmit={loginForm}>
          <FormInput placeholder="email" name="email" value={login} onChange={event => setLogin(event.target.value)}/>
          <FormInput placeholder="Password" name="password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
          <SubmitButton>Войти</SubmitButton>
          <ErrorMessage>
            {error}
          </ErrorMessage>
          <button type="button" onClick={closeLogin} href="/registration">
            Create a New Account
          </button>
        </form>
      </Popup>
      <Popup active={registrationPopupActive} setActive={setRegistrationPopupActive}>
        <form name="form-reg" className="loginRight" onSubmit={registrationForm}>
          <FormInput placeholder="email" name="email" type="email" value={login} onChange={event => setLogin(event.target.value)}/>
          <FormInput placeholder="Password" name="password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
          <FormInput placeholder="Name" name="name" type="text" value={userName} onChange={event => setUserName(event.target.value)}/>
          <FormInput placeholder="Surname" name="surname" type="text" value={userSurname} onChange={event => setUserSurname(event.target.value)}/>
          <SubmitButton>Зарегистрироваться</SubmitButton>
          <ErrorMessage>
            {error}
          </ErrorMessage>
          <button type="button" onClick={closeRegistration} href="/registration">
            Login
          </button>
        </form>
      </Popup>
      <RoleContext.Provider value={role}>
        <NameContext.Provider value={userName}>
          <Profile active={profileActive} setActive={setProfileActive} logout={() => setIsLogin(false)}/>
        </NameContext.Provider>
      </RoleContext.Provider>
    </>
  )
}

export default Header;