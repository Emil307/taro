import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 15px;
  right: 15px;
  height: calc(100% - 30px);
  width: calc(60% - 97px - 65px);
  border-radius: 0 40px 0px 0;
  background-color: #fff;
  z-index: 1000;
`

function Content({ active, setActive, data }) {
  return (
    <>
      {active
      ?
      <Container>
        <button onClick={setActive(false)}>close</button>
        {data.id}
      </Container>
      :
      <></>
      }
    </>
  )
}

export default Content;
