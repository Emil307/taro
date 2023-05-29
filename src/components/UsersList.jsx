import React from 'react';
import { useUsers } from '../hooks/useUsers';
import styled from "styled-components";
import User from '../components/User';

const Users = styled.div`
  width: 800px;
  height: 100%;
  padding: 20px;
`

function UsersList(users) {
  
  return (
    <Users>
      {users.users && users.users.map(user => 
        <User user={user} key={user.email}></User>
      )}
    </Users>
  )
}

export default UsersList;