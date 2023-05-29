import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export function useThemes() {
  const [themes, setThemes] = useState([]);

  const token = localStorage.getItem('token');
  const API = useSelector(state => state.api);

  async function getThemes(token) {
    try {
      const response = await axios.get(API + "api/v1/themes", {
        
      });

      setThemes(response.data);
      
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getThemes(token)
  }, [])

  return { themes }
}

