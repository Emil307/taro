import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useThemes } from '../hooks/useThemes';
import Title from '../UI/EditContent/Title';
import Text from '../UI/EditContent/Text';
import styled from 'styled-components';

const Container = styled.div``

const Button = styled.button`
  display: block;
  width: 100%;
  text-align: left;
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  
`

const Video = styled.iframe`
  width: 100%;
  height: 350px;
  border-radius: 20px;
  border: none;
  
`

const ContentList = (content) => {
  const [currentItem, setCurrentItem] = useState(null);
  const arr = content.content;

  const dispatch = useDispatch();

  const API = useSelector(state => state.api);
  const token = localStorage.getItem('token');

  const themes = useThemes().themes;
  const {id} = useParams();
  let theme = {};

  for (let i = 0; i < themes.length; i++) {
    if (themes[i].id == id) {
      theme = themes[i];
      break;
    }
  }

  function dragStartHandler(e, item) {
    setCurrentItem(item);
  }

  function dragEndHandler(e) {
    e.target.style.background = 'white';
  }

  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.background = 'lightgray';
  }

  function dropHandler(e, item) {
    arr.map(i => {
      if (i.id === item.id) {
        fetch(API + "api/v1/contents/" + item.id, {
            method : 'PUT',
            body : JSON.stringify({
                'theme_id': theme.id,
                'order': currentItem.order,
            }),
            headers : {
                "Authorization": token,
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        location.reload();
        return { ...i, order: currentItem.order }
      }
      if (i.id === currentItem.id) {
        fetch(API + "api/v1/contents/" + currentItem.id, {
            method : 'PUT',
            body : JSON.stringify({
                'theme_id': theme.id,
                'order': item.order,
            }),
            headers : {
                "Authorization": token,
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        location.reload();
        return { ...i, order: item.order }
      }
      return i
    })
    e.target.style.background = 'white'
  }

  const sortContent = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  function click(e, item) {
    dispatch({type: "SET_CURRENTITEM", payload: item});
    dispatch({type: "ACTIVATE_SIDEBAR", payload: true});
  }

  return (
    <Container>
      {arr && arr.sort(sortContent).map(item =>
        <li key={item.id}>
          <Button
            onDragStart={e => dragStartHandler(e, item)}
            onDragLeave={e => dragEndHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropHandler(e, item)}
            draggable={true}
            onDoubleClick={e => click(e, item)}
          >
            {item.type == 'title' ? <Title>{item.content}</Title> :
              item.type == 'text' ? <Text>{item.content}</Text> :
              item.type == 'img' ? <Image src={item.content}/> :
              <Video src={item.content} allow="autoplay; fullscreen; picture-in-picture; encrypted-media;" allowfullscreen></Video>
            }
          </Button>
        </li>
      )}
    </Container>
  )
}

export default ContentList;
