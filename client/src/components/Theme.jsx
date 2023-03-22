import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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

const Title = styled.button`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: .3px;
`

function Theme(theme) {
  const [role, setRole] = useState(useSelector(state => state.role));

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <a href={'/themes' + '/' + theme.theme.id}>
        <Container>
          <Title>{theme.theme.title}</Title>
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
    </a>
  );
}

export default Theme;
