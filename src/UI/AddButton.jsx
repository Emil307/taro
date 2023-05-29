import React from "react";
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #0F0C09;
`

function AddButton() {
  return (
    <Button>
      <AddIcon sx={{ fontSize: '24px', color: '#fff' }} />
    </Button>
  )
}

export default AddButton;
