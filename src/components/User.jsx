import React from 'react';

function User(props) {
  const user = props.user;
  
  return (
    <h1>{user.email}</h1>
  )
}

export default User;