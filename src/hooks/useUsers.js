import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export function useUsers() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem('token');
  const API = useSelector(state => state.api);

  async function getUsers(token) {
    try {
      const response = await axios.get(API + "api/v1/users", {
        headers : {"Authorization": token}
      });

      setUsers(response.data);
      
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUsers(token)
  }, [])

  return { users }
}