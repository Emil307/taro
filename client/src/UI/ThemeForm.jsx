import React, { useState } from 'react';
import styled from "styled-components";
import Popup from '../UI/popup/Popup';
import FormInput from '../UI/FormInput';
import SubmitButton from "./SubmitButton.jsx";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';

const Form = styled.form``

function ThemeForm({active, setActive}) {
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [image, setImage] = useState('');
    // const [isFree, setIsFree] = useState(false);
    const [course_id, setCourse_id] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [isFree, setIsFree] = useState(false);

    const dispatch = useDispatch();

    function submitForm(event) {
        const formData = new FormData(event.target);

        fetch("http://127.0.0.1:8000/api/v1/themes", {
            method : 'POST',
            body : formData
        })
        .then(response => response.text())
        .then(response => {
            response = JSON.parse(response);
        })


    }

    return (
            // <form onSubmit={submitForm}>
            //     {/* <FormInput type="text" placeholder="Название курса" name="title" value={title} onChange={event => setTitle(event.target.value)} required />
            //     <FormInput type="text" placeholder="Описание курса" name="description" value={description} onChange={event => setDescription(event.target.value)} required />
            //     <FormInput type="text" placeholder="интро URL" name="imageUrl" value={image} onChange={event => setImage(event.target.value)} />
            //     <FormControlLabel control={<Checkbox name='isFree'/>} label="Бесплатный курс" />
                
            //     <SubmitButton>Добавить курс</SubmitButton> */}
            // </form>
            <Popup active={active} setActive={setActive}>
                <form onSubmit={submitForm}>
                    <FormInput placeholder="id курса (ставим 1)" type="text" name="course_id" value={course_id} onChange={event => setCourse_id(event.target.value)} required/>
                    <FormInput placeholder="Название темы" type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} required/>
                    <FormInput placeholder="Контент" type="text" name="content" value={content} onChange={event => setContent(event.target.value)} required/>
                    <FormInput placeholder="видео URL" type="text" name="videoUrl" value={videoUrl} onChange={event => setVideoUrl(event.target.value)} />
                    <FormControlLabel control={<Checkbox name='isFree'/>} label="Бесплатная тема" />
                    <SubmitButton>Добавить тему</SubmitButton>
                </form>
            </Popup>
    );
}

export default ThemeForm;
