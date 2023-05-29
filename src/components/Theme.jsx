import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import MailForm from './MailForm';

const Button = styled.button`
  width: 100%;
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 50px);
  height: 56px;
  border-radius: 15px;
  padding: 0 25px;
  margin-top: 15px;
  background: #fff;
`

const Title = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: .3px;
  color: rgba(89, 61, 41, 0.85);
`

const SelectContent = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: #fff;
  width: 180px;
  padding: 15px 25px;
  border-radius: 15px;
  z-index: 101;
`

const SelectItemEdit = styled.a`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const SelectItemDelete = styled.button`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const SelectText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: rgba(89, 61, 41, 0.85);
`

function Theme(theme) {
  const [role, setRole] = useState(useSelector(state => state.role));
  const [active, setActive] = useState(false);
  const [token, setToken] = useState(useSelector(state => state.token));
  const [selectValue, setSelectValue] = useState(false);

  const API = useSelector(state => state.api);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    setToken(localStorage.getItem('token'));
  }, []);

  function redirect() {
    const link = '/themes' + '/' + theme.theme.id;
    window.location.href = link;
  }

  async function deleteTheme() {
    await axios.delete(API + "api/v1/themes/" + theme.theme.id, {
      headers : {"Authorization": token}
    });
    location.reload();
  }

  function openSelect() {
    setSelectValue(!selectValue);
  }

  return (
    <>
      <MailForm active={active} setActive={setActive}>
        Данная тема доступна только для студентов, для приобретения данного статуса, заполните форму ниже
      </MailForm>
      {theme.theme.isFree || role === 'student' || role === 'admin'
      ?
        <Button onClick={redirect}>
          <Container>
            <Title>{theme.theme.title}</Title>
            {role === "admin"
            ?
            <>
              <button onClick={openSelect}>
                <MoreHorizIcon sx={{
                  fontSize: 24,
                  color: "rgba(89, 61, 41, 0.85)"}}
                />
              </button>
              {selectValue 
                ? 
                <SelectContent>
                  <SelectItemEdit href={'/edit-theme/' + theme.theme.id}>
                    <SelectText>Изменить тему</SelectText>
                    <EditIcon sx={{
                        fontSize: 18,
                        color: "rgba(89, 61, 41, 0.85)",
                    }}/>
                  </SelectItemEdit>
                  <SelectItemDelete onClick={deleteTheme}>
                    <SelectText>Удалить тему</SelectText>
                    <DeleteOutlineIcon sx={{
                      fontSize: 18,
                      color: "rgba(89, 61, 41, 0.85)",
                    }}/>
                  </SelectItemDelete>
                </SelectContent> 
                :
                <></>
              }
            </>
            :
            <></>
            }
          </Container>
        </Button>
      :
      <>
        <Button onClick={() => setActive(true)}>
          <Container>
            <Title>{theme.theme.title}</Title>
          </Container>
          </Button>
      </>
      }
    </>
  );
}

export default Theme;
