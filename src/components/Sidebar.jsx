import React, { useRef } from 'react';
import { useThemes } from '../hooks/useThemes';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px auto;
  width: 80%;
  border: 1px #eee solid;
  border-radius: 15px;
  padding: 10px;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Input = styled.input`
  width: 100%;
`

const Sidebar = ({ active, setActive, item }) => {
  const themes = useThemes().themes;
  const editRef = useRef();
  const API = useSelector(state => state.api);
  const token = localStorage.getItem('token');

  const {id} = useParams();
  let theme = {};

  for (let i = 0; i < themes.length; i++) {
    if (themes[i].id == id) {
      theme = themes[i];
      break;
    }
  }

  function editSubmit(event) {
    event.preventDefault();

    if (editRef.current.value == '') {
      fetch(API + "api/v1/contents/" + item.id, {
        method : 'DELETE',
        headers : {
          "Authorization": token,
          'Content-Type': 'application/json; charset=UTF-8',
        }
      })
    } else {
      fetch(API + "api/v1/contents/" + item.id, {
        method : 'PUT',
        body : JSON.stringify({
          'theme_id': theme.id,
          'content': editRef.current.value,
        }),
        headers : {
          "Authorization": token,
          'Content-Type': 'application/json; charset=UTF-8',
        }
      })
    }
    location.reload();
  }
  
  return (
    <>
      {active ? 
        <Container>
          <Form onSubmit={editSubmit}>
            <Input defaultValue={item.content} ref={editRef} type="text" />
            <button>Сохранить</button>
          </Form>
        </Container> : 
      <></>}
    </>
  )
}

export default Sidebar;
