import React from 'react';
import { useSelector } from 'react-redux';
import { useThemes } from '../hooks/useThemes';
import { useContent } from '../hooks/useContent';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import addTitleIcon from '../images/add-title.svg';
import addParagraphIcon from '../images/add-paragraph.svg';
import addImageIcon from '../images/add-image.svg';
import addVideoIcon from '../images/add-video.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto 20px;
`

const EditorAdder = () => {
  const API = useSelector(state => state.api);
  const token = localStorage.getItem('token');

  const content = useContent().content;
  const themes = useThemes().themes;

  const {id} = useParams();
  let theme = {};

  for (let i = 0; i < themes.length; i++) {
      if (themes[i].id == id) {
      theme = themes[i];
      break;
      }
  }

  function addTitle() {
    fetch(API + "api/v1/contents", {
      method : 'POST',
      body : JSON.stringify({
        'theme_id': theme.id,
        'type': 'title',
        'content': 'Заголовок',
        'order': content.length + 1,
      }),
      headers : {
        "Authorization": token,
        'Content-Type': 'application/json; charset=UTF-8',
      }
    });
    location.reload();
  }

  function addText() {
    fetch(API + "api/v1/contents", {
      method : 'POST',
      body : JSON.stringify({
        'theme_id': theme.id,
        'type': 'text',
        'content': 'Текстовое поле',
        'order': content.length + 1,
      }),
      headers : {
        "Authorization": token,
        'Content-Type': 'application/json; charset=UTF-8',
      }
    });
    location.reload();
  }

  function addImage() {
    fetch(API + "api/v1/contents", {
      method : 'POST',
      body : JSON.stringify({
        'theme_id': theme.id,
        'type': 'image',
        'content': 'https://sun9-35.userapi.com/impg/wKvfKD7bbFxHsvyJuiRLbB2wrbOanQtJgI-zaA/Hzs0VpJ_daE.jpg?size=48x40&quality=95&sign=01224069e4d59d9800c4a5644ec0460b&type=album',
        'order': content.length + 1,
      }),
      headers : {
        "Authorization": token,
        'Content-Type': 'application/json; charset=UTF-8',
      }
    });
    location.reload();
  }

  function addVideo() {
    fetch(API + "api/v1/contents", {
      method : 'POST',
      body : JSON.stringify({
        'theme_id': theme.id,
        'type': 'video',
        'content': 'https://kinescope.io/203609801',
        'order': content.length + 1,
      }),
      headers : {
        "Authorization": token,
        'Content-Type': 'application/json; charset=UTF-8',
      }
    });
    location.reload();
  }

  return (
    <Container>
      <button onClick={addTitle}><img src={addTitleIcon}/></button>
      <button onClick={addText}><img src={addParagraphIcon}/></button>
      <button onClick={addImage}><img src={addImageIcon}/></button>
      <button onClick={addVideo}><img src={addVideoIcon}/></button>
    </Container>
  )
}

export default EditorAdder;