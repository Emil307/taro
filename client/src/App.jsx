import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/global';
import './styles/fonts.css';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
      <GlobalStyles/>
    </>
  )
}

export default App
