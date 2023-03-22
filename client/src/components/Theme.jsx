import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MailForm from './MailForm';

const Container = styled.div`
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
`

function Theme(theme) {
  const [role, setRole] = useState(useSelector(state => state.role));
  const [active, setActive] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <>
      <MailForm active={active} setActive={setActive}>
        Данная тема доступна только для студентов, для приобретения данного статуса, заполните форму ниже
      </MailForm>
      {theme.theme.isFree || role === 'student' || role === 'admin'
      ?
        <Container>
          <a href={'/themes' + '/' + theme.theme.id}>
            <Title>{theme.theme.title}</Title>
          </a>
          {role === "admin"
          ?
          <button>
            <DeleteOutlineIcon sx={{
              fontSize: 20,
              color: "rgba(89, 61, 41, 0.85)",
            }}/>
          </button>
          :
          <></>
          }
        </Container>
      :
      <>
          <Container>
            <button onClick={() => setActive(true)}>
              <Title>{theme.theme.title}</Title>
            </button>
            {role === "admin"
            ?
            <button>
              <DeleteOutlineIcon sx={{
                fontSize: 20,
                color: "rgba(89, 61, 41, 0.85)",
              }}/>
            </button>
            :
            <></>
            }
          </Container>
      </>
      }
    </>
  );
}

export default Theme;
