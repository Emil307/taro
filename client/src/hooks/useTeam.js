import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function useTeam() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTeam() {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/v1/userlist");
      setTeam(response.data.users);
      setLoading(false);
    } catch(e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTeam()
  }, [])

  return { team, loading }
}