import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography} from '@mui/material';


export const UserInfo = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users`);
        setUser(res.data[0]);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
<Card style={{ margin: '20px', maxWidth: '600px', backgroundColor: '#E0E5FE', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
  <CardContent>
    <Typography variant="h4" component="h1" gutterBottom style={{ color: '#8C9EFF', marginBottom: '10px', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>
      User Profile
    </Typography>
    <Typography variant="subtitle1" gutterBottom style={{ color: '#A2B2FF', fontSize: '24px', fontFamily: 'Arial, sans-serif', borderBottom: '1px solid white', paddingBottom: '10px' }}>
      Name: {user.username}
    </Typography>
    <Typography variant="subtitle1" gutterBottom style={{ color: '#A2B2FF', fontSize: '24px', fontFamily: 'Arial, sans-serif', borderBottom: '1px solid white', paddingBottom: '10px' }}>
      Email: {user.email}
    </Typography>
    <Typography variant="subtitle1" gutterBottom style={{ color: '#A2B2FF', fontSize: '24px', fontFamily: 'Arial, sans-serif', borderBottom: '1px solid white', paddingBottom: '10px' }}>
      Gender: {user.gender}
    </Typography>
    <Typography variant="subtitle1" gutterBottom style={{ color: '#A2B2FF', fontSize: '24px', fontFamily: 'Arial, sans-serif', borderBottom: '1px solid white', paddingBottom: '10px' }}>
      Location: {user.location}
    </Typography>
    <Typography variant="subtitle1" gutterBottom style={{ color: '#A2B2FF', fontSize: '24px', fontFamily: 'Arial, sans-serif', borderBottom: '1px solid white', paddingBottom: '10px' }}>
      Birth Date: {user.birth_date}
    </Typography>
    <Typography variant="subtitle1" gutterBottom style={{ color: '#A2B2FF', fontSize: '24px', fontFamily: 'Arial, sans-serif', borderBottom: '1px solid white', paddingBottom: '10px' }}>
      Join Date: {user.join_date}
    </Typography>
  </CardContent>
</Card>

  );
};
