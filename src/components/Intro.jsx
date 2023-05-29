import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import MailForm from "./MailForm";
import desktop from '../images/desktop.png';
import introBg from '../images/intro-bg.png';

const Section = styled.section`
  position: relative;
  width: 100%; 
  height: 100vh;
  background-color: #131313;
  overflow: hidden;
`

const Container = styled.div`
  display: flex;
  overflow: hidden; 
  width: 100%;
  height: 100%;
  max-width: 1140px;
  padding: 0 15px;
  margin: 0 auto;
  align-items: center;
`

const Offer = styled.div`
  margin-top: 83px;
  height: 519px;
`

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 50px;
  line-height: 68px;
  color: #fff;
`

const Span = styled.span`
  color: #E63765;
`

const Text = styled.p`
  width: 486px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #fff;
  margin-top: 30px;
`

const Button = styled.button`
  width: 408px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 25px;
  font-family: 'Inter', sans-serif;
  line-height: 1.3;
  font-weight: 500;
  border-radius: 10px;
  background: #E63765;
  box-shadow: 0px 0px 15px 3px rgba(230, 55, 101, 0.75);
  margin-top: 30px;
`

const Desktop = styled.img`
  width: 700px;
  position: absolute;
  top: -122px;
  right: 0;
  z-index: 10;
`

const Bg = styled.img`
  position: absolute;
  top: 200px;
  right: -300px;
  z-index: 9;
  width: 700px;
  height: 600px;
  transform: rotate(-45deg);
`

function Intro() {
  const [active, setActive] = useState(false);

  const isLogin = useSelector(state => state.isLogin);

  return (
    <Section>

      <MailForm active={active} setActive={setActive}/>
      
      <Container>
        <Offer>
          <Title>Практическое<Span> Таро</Span></Title>
          <Text>
            По окончании курса вы получите навык работы с картами и возможность помогать людям, проводя консультации в области изотерики
          </Text>
          {isLogin
          ?
          // <Button onClick={sendMail(token)}>Записаться на курс</Button>
          <Button onClick={() => setActive(true)}>Записаться на курс</Button>
          :
          <Button onClick={() => setActive(true)}>Записаться на курс</Button>
          }
        </Offer>
        <Desktop src={desktop}/>
        <Bg src={introBg}/>
      </Container>
    </Section>
  )
}

export default Intro;
