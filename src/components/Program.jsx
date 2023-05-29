import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  width: 100%;
  background-color: #131313;
`

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto; 
  padding: 0 15px;
`

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 53px;
  line-height: 1.49;

  text-align: center;
  letter-spacing: 1px;
  color: #E63765;
`

const Columns = styled.div`
  margin-top: 61px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Column = styled.div`
  width: 346px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Card = styled.div`
  width: calc(100% - 30px - 4px);
  border: 2px #E63765 solid;
  padding: 20px 15px;
  border-radius: 10px;
`

const CardSubTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.2;
  color: #fff;
  text-transform: uppercase;
`

const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.2;
  color: #E63765;
  margin-top: 12px;
  padding-bottom: 30px;
  border-bottom: 1px #fff solid;
`

const Lessons = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-top: 20px;
`

const LessonsList = styled.ul`
  margin-top: 20px;
`

const Lesson = styled.li`
  margin-bottom: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
`

const Program = () => {
  return (
    <Section>
      <Container>
        <Title>ПРОГРАММА КУРСА</Title>
        <Columns>
          <Column>
            <Card>
              <CardSubTitle>модуль 1</CardSubTitle>
              <CardTitle>Как убрать предубеждение о таро? Взгляд с другой стороны</CardTitle>
              <Lessons>Уроки:</Lessons>
              <LessonsList>
                <Lesson>Ответы на часто задаваемые вопросы новичков</Lesson>
                <Lesson>Предрассудки и страхи о таро</Lesson>
                <Lesson>Гадание - дар бога</Lesson>
                <Lesson>Таро и общественное мнение</Lesson>
                <Lesson>Когнитивные искажения</Lesson>
              </LessonsList>
            </Card>
          </Column>
          <Column>
            <Card>
              <CardSubTitle>модуль 2</CardSubTitle>
              <CardTitle>Что такое таро?</CardTitle>
              <Lessons>Уроки:</Lessons>
            </Card>
          </Column>
          <Column>
            <Card>
              <CardSubTitle>модуль 3</CardSubTitle>
              <CardTitle>Внутреннее пространство Таро</CardTitle>
              <Lessons>Уроки:</Lessons>
            </Card>
          </Column>
        </Columns>
      </Container>
    </Section>
  )
}

export default Program;