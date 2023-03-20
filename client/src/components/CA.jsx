import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`

const Title = styled.h2`
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 30px;
  line-height: 42px;
  text-transform: uppercase;
  color: #464AA4;
`

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`

const Item = styled.div`
  width: 270px;
  height: 400px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  padding: 15px;
  padding-top: 20px;
`

const ItemImageBG = styled.div``

const ItemImage = styled.img``

const ItemTitleBG = styled.div``

const ItemTitle = styled.h3``

const ItemInfo = styled.div``

const ItemText = styled.p``

function CA() {
    return (
        <Container>
            <Title>кому подойдёт этот курс</Title>
            <Wrapper>
                <Item>
                    <ItemImageBG>
                      <ItemImage/>
                    </ItemImageBG>
                    <ItemTitleBG>
                      <ItemTitle></ItemTitle>
                    </ItemTitleBG>
                    <ItemInfo>
                      <ItemText></ItemText>
                    </ItemInfo>
                </Item>
                <Item></Item>
                <Item></Item>
            </Wrapper>
        </Container>
    );
}

export default CA;
