import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  padding-top: 60px;
  margin: 0 auto;
`

const Title = styled.h2`
  text-align: center;
  font-family: 'Alegreya SC', serif;
  font-weight: 500;
  font-size: 48px;
  line-height: 54px;
  text-transform: uppercase;
  color: #464AA4;
`

const Wrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
`

const Item = styled.div`
  width: 270px;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  background-color: #ddd;
  border: 15px solid #fff;
`

const ItemImageBG = styled.div`
  width: 100%;
  height: 170px;
`

const ItemImage = styled.img``

const ItemTitleBG = styled.div`
  padding: 18px 0;
  border-radius: 20px 20px 0 0;
  background-color: #464AA4;
`

const ItemTitle = styled.h3`
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-transfrom: uppercase;
  text-align: center;
  color: #fff;
`

const ItemInfo = styled.div`
  height: 150px;
  padding-top: 20px;
  background-color: #fff;
`

const ItemText = styled.p``

function CA() {
    return (
        <Container>
            <Title>кому подойдёт этот курс</Title>
            <Wrapper>
                <Item>
                    <ItemImageBG>
                      <ItemImage/>
                      <ItemTitleBG>
                        <ItemTitle>Новичку</ItemTitle>
                      </ItemTitleBG>
                    </ItemImageBG>
                    <ItemInfo>
                      <ItemText>
                        Если вы еще никогда не работали с таро. В ходе курса вы получите профессию, а также сэкономите кучу времени и сил, не пытаясь разобраться самостоятельно
                      </ItemText>
                    </ItemInfo>
                </Item>
                <Item></Item>
                <Item></Item>
            </Wrapper>
        </Container>
    );
}

export default CA;
