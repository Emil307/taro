import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/global';
import './styles/fonts.css';
import Home from './pages/Home';
import ThemePage from './pages/ThemePage';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path={'/themes' + '/:id'} element={ <ThemePage/> }/>
      </Routes>
      <GlobalStyles/>
    </>
  )
}

export default App
