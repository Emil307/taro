import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/global';
import './styles/fonts.css';
import Home from './pages/Home';
import ThemePage from './pages/ThemePage';
import UsersPage from './pages/UsersPage';
import CreateTheme from './pages/CreateTheme';
import EditTheme from './pages/EditTheme';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path={'/themes' + '/:id'} element={ <ThemePage/> }/>
        <Route path='/users' element={ <UsersPage/> }/>
        <Route path='/create-theme' element={ <CreateTheme/> }/>
        <Route path={'/edit-theme' + '/:id'} element={ <EditTheme/> }/>
      </Routes>
      <GlobalStyles/>
    </>
  )
}

export default App
