import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export function useThemes() {
  const [themes, setThemes] = useState([]);

  const dispatch = useDispatch();
  const token = useSelector(state => state.token);

  async function getThemes(token) {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/themes", {
        headers : {"Authorization": token}
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

