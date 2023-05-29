import React from 'react';
import { useUsers } from '../hooks/useUsers';
import styled from "styled-components";
import Layout from '../components/Layout';
import SearchIcon from '@mui/icons-material/Search';
import UsersList from '../components/UsersList';
import Select from '../UI/Select';

const Content = styled.div`
  width: 1000px;
  display: flex;
  margin: 0 auto;
`

const Filters = styled.div`
  width: 200px;
  padding-top: 20px;
`

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  padding: 10px;
  border-radius: 10px;
  border: 1px #ededed solid;
  margin-bottom: 10px;
`

const SearchInput = styled.input`
  width: 100px;
  color: #adadad;
`

const UsersPage = () => {
  const users = useUsers().users;

  function sortNewUsers() {
    users.sort((firstUser, secondUser) => secondUser.id - firstUser.id);
  }

  function sortOldUsers() {
    users.sort((firstUser, secondUser) => firstUser.id - secondUser.id);
  }

  console.log(users);  
  return (
    <Layout>
      <Content>
        <Filters>
          <Search>
            <SearchInput placeholder='Поиск по E-mail'/>
            <button><SearchIcon sx={{color: '#adadad'}}></SearchIcon></button>
          </Search>
          <Select
            options={[
              {value: 'created_at', name: 'сначала новые'},
              {value: 'created', name: 'сначала старые'},
            ]}
          />
          <button onClick={sortNewUsers}>sortNewUsers</button>
        </Filters>
        <UsersList users={users}/>
      </Content>
    </Layout> 
  )
}

export default UsersPage;
