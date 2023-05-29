import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { useThemes } from '../hooks/useThemes';
import { useContent } from '../hooks/useContent';
import FormInput from '../UI/FormInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddButton from '../UI/AddButton';

const Content = styled.div`
    width: calc(100% - 80px);
    height: calc(100% - 80px);
    padding: 40px;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0;
    }
`

const Top = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Forms = styled.div`
    width: 1400px;
    display: flex;
    justify-content: space-between;
    margin: 40px auto 0;
`

const FormAdd = styled.form`
    display: flex;
    justify-content: space-between;
    width: 300px;
`

const ContentData = styled.div`
    max-width: calc(100% - 80px);
    width: 800px;
    margin: 80px auto 0;
`

const EditForm = styled.form`

`

const ThemeTitle = styled.h1`
    font-family: 'Inter', sans-serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.2;
    &:focus {
        outline: none;
    }
`

const PageForm = styled.form``

const Title = styled.input`
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    margin-top: 40px;
    margin-bottom: -20px;
`

const Text = styled.p`
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.2;
    margin-top: 32px;
`

const Image = styled.img`
    width: 100%;
    margin-top: 32px;
`

const Video = styled.iframe`
  width: 100%;
  height: 350px;
  border-radius: 20px;
  border: none;
  margin-top: 32px;
`

const SaveButton = styled.button`
    margin-top: 100px;
`

const EditTheme = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [img, setImg] = useState('');
    const [video, setVideo] = useState('');

    const [editTitle, setEditTitle] = useState('');

    const [currentItem, setCurrentItem] = useState(null);
    const [currentEditContent, setCurrentEditContent] = useState(null);

    const titleInputRef = useRef();
    const editTitleRef = useRef();

    const API = useSelector(state => state.api);
    const token = localStorage.getItem('token');

    const {id} = useParams();
    const themes = useThemes().themes;
    const content = useContent().content;
    const editContent = useContent().content;
    let theme = {};

    for (let i = 0; i < themes.length; i++) {
        if (themes[i].id == id) {
        theme = themes[i];
        break;
        }
    }

    const [checked, setChecked] = useState(false);

    function changeCheckbox() {
        setChecked(!checked);
    }

    function submitForm(event) {
        const formData = new FormData(event.target);
    
        fetch(API + "api/v1/themes/" + theme.id, {
            method : 'PUT',
            body : formData,
            headers : {"Authorization": token}
        })
        .then(response => response.text())
        .then(response => {
            response = JSON.parse(response);
        })
    }
    
    function addTitle() {
        fetch(API + "api/v1/contents", {
            method : 'POST',
            body : JSON.stringify({
                'theme_id': theme.id,
                'type': 'title',
                'content': title,
                'order': content.length + 1,
            }),
            headers : {
                "Authorization": token,
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.text())
        .then(response => {
            response = JSON.parse(response);
        })
    }

    function addText() {
        fetch(API + "api/v1/contents", {
            method : 'POST',
            body : JSON.stringify({
                'theme_id': theme.id,
                'type': 'text',
                'content': text,
                'order': content.length + 1,
            }),
            headers : {
                "Authorization": token,
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.text())
        .then(response => {
            response = JSON.parse(response);
        })
    }

    function addImg() {
        fetch(API + "api/v1/contents", {
            method : 'POST',
            body : JSON.stringify({
                'theme_id': theme.id,
                'type': 'img',
                'content': img,
                'order': content.length + 1,
            }),
            headers : {
                "Authorization": token,
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.text())
        .then(response => {
            response = JSON.parse(response);
        })
    }

    function addVideo() {
        fetch(API + "api/v1/contents", {
            method : 'POST',
            body : JSON.stringify({
                'theme_id': theme.id,
                'type': 'video',
                'content': video,
                'order': content.length + 1,
            }),
            headers : {
                "Authorization": token,
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.text())
        .then(response => {
            response = JSON.parse(response);
        })
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
        content.map(i => {
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

    function submitEditForm() {
        location.reload();
    }

    function editChange(e, item) {
        setEditTitle(e.target.value);
        for (let i = 0; i < editContent.length; i++) {
            if (editContent[i].id === item.id) {
                editContent[i].content = e.target.value;
                console.log(editContent[i]);
                fetch(API + "api/v1/contents/" + editContent[i].id, {
                    method : 'PUT',
                    body : JSON.stringify({
                        'theme_id': editContent[i].theme_id,
                        'content': editContent[i].content,
                        'type': editContent[i].type,
                        'order': editContent[i].order,
                    }),
                    headers : {
                        "Authorization": token,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                })
            }
        }
    }

    return (
        <Layout>
            <Content>
                <Top>
                    <EditForm onSubmit={submitForm}>
                        <FormInput ref={titleInputRef} defaultValue={theme.title} type='text' name='title'/>
                        <FormControlLabel control={<Checkbox name='isFree' checked={checked} onChange={changeCheckbox}/>} label="Бесплатная тема" />                                  
                        <button>Сохранить</button>
                    </EditForm>
                </Top>
                <Forms>
                        <FormAdd onSubmit={addTitle}>
                            <FormInput placeholder='новый заголовок' type="text" value={title} onChange={event => setTitle(event.target.value)}/>
                            <AddButton/>
                        </FormAdd>
                        <FormAdd onSubmit={addText}>
                            <FormInput placeholder='новое текстовое поле' type="text" value={text} onChange={event => setText(event.target.value)}/>
                            <AddButton/>
                        </FormAdd>
                        <FormAdd onSubmit={addImg}>
                            <FormInput placeholder='новое изобржение' type="text" value={img} onChange={event => setImg(event.target.value)}/>
                            <AddButton/>
                        </FormAdd>
                        <FormAdd onSubmit={addVideo}>
                            <FormInput placeholder='новое видео' type="text" value={video} onChange={event => setVideo(event.target.value)}/>
                            <AddButton/>
                        </FormAdd>
                        {title}
                </Forms>       
                <ContentData>
                    <ThemeTitle>{theme.title}</ThemeTitle>
                    <PageForm onSubmit={submitEditForm}>
                        {content && content.sort(sortContent).map(item => 
                            <li 
                                onDragStart={e => dragStartHandler(e, item)}
                                onDragLeave={e => dragEndHandler(e)}
                                onDragEnd={e => dragEndHandler(e)}
                                onDragOver={e => dragOverHandler(e)}
                                onDrop={e => dropHandler(e, item)}
                                draggable={true}
                                key={item.id}
                            >
                                {item.type == 'title' ? <Title name={item.id} value={editTitle || item.content} onChange={e => editChange(e, item)} /> :
                                item.type == 'text' ? <Text contentEditable suppressContentEditableWarning>{item.content}</Text> :
                                item.type == 'img' ? <Image src={item.content}/> :
                                <Video src={item.content} allow="autoplay; fullscreen; picture-in-picture; encrypted-media;" allowfullscreen></Video>
                                }
                            </li>
                        )}
                        <SaveButton>save</SaveButton>
                    </PageForm>
                </ContentData>
            </Content>
        </Layout>
    )
}

export default EditTheme;
