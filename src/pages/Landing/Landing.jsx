import { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import LandingCards from '../../components/LandingCards/LandingCards'
import { CssBaseline } from '@mui/material'
import { styled } from '@mui/system';





import island from '../../assets/island.jpg'

const MyDiv = styled('div')({
  minHeight: '100vh',
  backgroundImage: `url(${island})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
})



export default function Landing({ user, setUser }) {
  

  return (
    <MyDiv>
      <CssBaseline />
      <Header user={user} setUser={setUser} />
      <LandingCards />
    </MyDiv>

  );
}