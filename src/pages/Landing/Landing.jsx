import { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import LandingCards from '../../components/LandingCards/LandingCards'
import { CssBaseline } from '@mui/material'
import { styled } from '@mui/system';

import * as leaguesAPI from '../../utilities/leagues-api'

import island from '../../assets/island.jpg'

const MyDiv = styled('div')({
  minHeight: '100vh',
  backgroundImage: `url(${island})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
})



export default function Landing({ user, setUser }) {
  const [leagues, setLeagues] = useState([]);
  useEffect(function() {
    async function getLeagues() {
      const leagues = await leaguesAPI.getAll()
      console.log(leagues)
      setLeagues(leagues)
    }
    getLeagues();
  }, [])

  return (
  <MyDiv>
    <CssBaseline />
    <Header user={user} setUser={setUser}/>
    <LandingCards />
  </MyDiv>
  );
}