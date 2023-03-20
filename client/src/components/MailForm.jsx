import React, { useState } from 'react';
import styled from 'styled-components';
import Popup from '../UI/popup/Popup';
import FormInput from '../UI/FormInput';
import TextArea from '../UI/TextArea';
import SubmitButton from '../UI/SubmitButton';

function MailForm({active, setActive}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [message, setMessage] = useState('');

  function submitForm(event) {
    const formData = new FormData(event.target);

    event.preventDefault();
    fetch("http://127.0.0.1:8000/api/v1/send-message/", {
      method : 'POST',
      body : formData
    })
    .then (response => response.text())
    .then (response => {
      response = JSON.parse(response);
      if (response.result == 'ok') {
        setActive(false);
      }
    })
  }

  return (
    <Popup active={active} setActive={setActive}>
      <form onSubmit={submitForm}>
        <FormInput placeholder='E-mail*' type='email' name='email' value={email} onChange={event => setEmail(event.target.value)} required/>
        <FormInput placeholder='Имя' type='text' name='name' value={name} onChange={event => setName(event.target.value)} />
        <FormInput placeholder='Фамилия' type='text' name='surname' value={surname} onChange={event => setSurname(event.target.value)} />
        <TextArea placeholder='Сообщение' name='message' value={message} onChange={event => setMessage(event.target.value)} />
        <SubmitButton>Отправить</SubmitButton>
      </form>
    </Popup>
  )
}

export default MailForm;
