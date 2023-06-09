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
  z-index: 101;
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
  const API = useSelector(state => state.api);

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
    setRole(localStorage.getItem('role'));
    setProfileActive(localStorage.getItem('profile'));
  }, [])

  function loginForm(event) {
    const formData = new FormData(event.target);

    event.preventDefault();
    fetch(API + "auth/token/login/", {
      method : 'POST',
      body : formData
    })
    .then (response => response.text())
    .then (response => {
      response = JSON.parse(response);
      if (response.auth_token) {
        getUser("Token " + response.auth_token);
      }
    })
  }

  function getUser(token) {
    fetch(API + "api/v1/auth/users/me", {
      method : 'GET',
      headers : {"Authorization": token}
    })
    .then (response => response.text())
    .then (response => {
      response = JSON.parse(response);
      if (response) {
        localStorage.setItem('isLogin', true);
        localStorage.setItem('role', response.role);
        localStorage.setItem('token', token);
        setIsLogin(true);
        dispatch({type: "UPDATE_TOKEN", payload: token});
        dispatch({type: "SET_ISLOGIN", payload: true});
        dispatch({type: "SET_ROLE", payload: response.role});
        setRole(response.role);
        setLoginPopupActive(false);
        setProfileActive(true);
      }
    })
  }

  function registrationForm(event) {
    const formData = new FormData(event.target);

    event.preventDefault();
    fetch(API + "api/v1/auth/users/", {
      method : 'POST',
      body : formData,
    })
    .then (response => response.text())
    .then (response => {
      response = JSON.parse(response);
      if (typeof response.id !== 'undefined') {
        localStorage.setItem('isLogin', true);
        localStorage.setItem('role', response.role);
        setIsLogin(true);
        setRegistrationPopupActive(false);
        dispatch({type: "SET_ISLOGIN", payload: true});
        dispatch({type: "SET_ROLE", payload: response.role});
        setRole(response.role);
        setProfileActive(true);
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

  function openProfile() {
    setProfileActive(true);
    localStorage.setItem('profile', true);
  }
  
  return (
    <>
      <Head>
        <a href='/'></a>
        {isLogin 
          ?
          <ul>
            <li>
              <Button onClick={openProfile}>в профиль</Button>
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
          <FormInput placeholder="E-mail" name="email" value={login} onChange={event => setLogin(event.target.value)}/>
          <FormInput placeholder="Пароль" name="password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
          <SubmitButton>Войти</SubmitButton>
          <ErrorMessage>
            {error}
          </ErrorMessage>
          <button type="button" onClick={closeLogin} href="/registration">
            Не зарегистрированы? Создать аккаунт
          </button>
        </form>
      </Popup>
      <Popup active={registrationPopupActive} setActive={setRegistrationPopupActive}>
        <form name="form-reg" className="loginRight" onSubmit={registrationForm}>
          <FormInput placeholder="E-mail*" name="email" type="email" value={login} onChange={event => setLogin(event.target.value)}/>
          <FormInput placeholder="Пароль*" name="password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
          <FormInput placeholder="Иван" name="name" type="text" value={userName} onChange={event => setUserName(event.target.value)}/>
          <FormInput placeholder="Иванов" name="surname" type="text" value={userSurname} onChange={event => setUserSurname(event.target.value)}/>
          <SubmitButton>Зарегистрироваться</SubmitButton>
          <ErrorMessage>
            {error}
          </ErrorMessage>
          <button type="button" onClick={closeRegistration} href="/registration">
            Уже есть аккаунт? Войти
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