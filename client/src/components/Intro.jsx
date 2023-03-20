import React from "react";
import styled from "styled-components";
import hand from '../images/hand.png';
import introBg from '../images/intro-bg.jpg';

const Section = styled.section`
  position: relative;
  width: 100%; 
  height: 100vh;
  background-image: url(${introBg});
  background-size: cover;
  backround-repeat: no-repeat;
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

const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 540px;
`

const SubTitle = styled.h2`
  font-family: 'Alegreya SC', serif;
  font-weight: 500;
  font-size: 50px;
  line-height: 68px;
  text-transform: uppercase;
  color: #464AA4;
`

const Lenash = styled.span`
  width: 165px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #FEE8DC;

  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
`

const Title = styled.h1`
  font-family: 'Alegreya SC', serif;
  font-style: normal;
  font-weight: 500;
  font-size: 50px;
  line-height: 68px;
  text-transform: uppercase;
  color: #464AA4;
`

const Description = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 570px;
  margin-top: 19px;
`

const Circles = styled.div`
  display: flex;
  margin-top: 9px;
`

const Text = styled.p`
  width: 486px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
`

const Button = styled.button`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.56;
  text-transform: uppercase;
  color: #555555;

  padding: 28px 66px;
  border-radius: 40px; 
  box-shadow: 0px 5px 2px rgba(0, 0, 0, 0.25);
  background: #FFE076;
  margin-top: 43px;
`

const Desktop = styled.img`
  width: 700px;
  position: absolute;
  bottom: 0;
  right: 0;
`

function Intro() {
  return (
    <Section>
      <Container>
        <Offer>
          <SubTitleWrapper>
            <SubTitle>онлайн-курс</SubTitle>
            <Lenash>@lenashhh</Lenash>
          </SubTitleWrapper>
          <Title>“практическое таро”</Title>
          <Description>
            <Circles>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#464AA4"/>
              </svg>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#4950DC"/>
              </svg>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#9094EB"/>
              </svg>              
            </Circles>
            <Text>
              По окончании курса вы получите навык работы с картами и возможность помогать людям, проводя консультации в области изотерики
            </Text>
          </Description>
          <Button>Записаться на курс</Button>
        </Offer>
        <Desktop src={hand}/>
      </Container>
    </Section>
  )
}

export default Intro;
