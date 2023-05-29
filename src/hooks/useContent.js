import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export function useContent() {
  const [content, setContent] = useState([]);

  const token = localStorage.getItem('token');
  const API = useSelector(state => state.api);
  const {id} = useParams();

  async function getContent(token) {
    try {
      const response = await axios.get(API + 'api/v1/contents/' + id, {
        headers : {"Authorization": token}
      });

      setContent(response.data);

    } catch (e) {
      console.log(e);
    }
  } 

  useEffect(() => {
    getContent(token)
  }, [])

  return { content }
}