import { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import LandingCards from '../../components/LandingCards/LandingCards'
import { CssBaseline } from '@mui/material'
import { styled } from '@mui/system';

import * as leaguesAPI from '../../utilities/leagues-api'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

import island from '../../assets/island.jpg'

const MyDiv = styled('div')({
  minHeight: '100vh',
  backgroundImage: `url(${island})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
})

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});


export default function Landing({ user, setUser }) {
  const [leagues, setLeagues] = useState([]);
  useEffect(function() {
    async function getLeagues() {
      const leagues = await leaguesAPI.getAll()
      setLeagues(leagues)
    }
    getLeagues();
  }, [])

  return (
    <MyDiv>
      <CssBaseline />
      <Header user={user} setUser={setUser} leagues={leagues} theme={theme} />
      <LandingCards />
    </MyDiv>

  );
}