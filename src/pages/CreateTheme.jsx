import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Layout from '../components/Layout';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
`

const CreateTheme = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const API = useSelector(state => state.api);
  const token = localStorage.getItem('token');

  function submitForm(event) {
    const formData = new FormData(event.target);

    fetch(API + "api/v1/themes", {
        method : 'POST',
        body : formData,
        headers : {"Authorization": token}
    })
    .then(response => response.text())
    .then(response => {
        response = JSON.parse(response);
    })
  }

  return (
    <Layout>
      <Content>
        <form onSubmit={submitForm}>
          <input placeholder="Название темы" type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} required/>
          <input placeholder="Контент" type="text" name="content" value={content} onChange={event => setContent(event.target.value)}/>
          <input placeholder="видео URL" type="text" name="videoUrl" value={videoUrl} onChange={event => setVideoUrl(event.target.value)} />
          <FormControlLabel control={<Checkbox name='isFree'/>} label="Бесплатная тема" />
          <button>Добавить тему</button>
        </form>
      </Content>
    </Layout>
  )
}

export default CreateTheme