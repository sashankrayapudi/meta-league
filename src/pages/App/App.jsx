import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import LandingCards from '../../components/LandingCards/LandingCards'
// import './App.css';

import { makeStyles } from '@mui/styles'
import { CssBaseline } from '@mui/material'
import { styled } from '@mui/system';
import island from '../../assets/island.jpg'
import bg from '../../assets/bg.jpeg'

import * as leaguesAPI from '../../utilities/leagues-api'

const MyDiv = styled('div')({
  minHeight: '100vh',
  backgroundImage: `url(${island})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
})


export default function App() {
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
    <Header />
    <LandingCards />
  </MyDiv>
  );
}

// export default function App() {
//   const [user, setUser] = useState(getUser());

//   const classes = useStyles();

//   return (
//     <main className="App">
//       { user ?
//         <>
//           <NavBar user={user} setUser={setUser} />
//           <div className={classes.root2}>hi</div>
//           <Routes>
//             <Route path='/orders/new' element={<NewOrderPage />} />
//             <Route path='/orders/new' element={<NewOrderPage />} />
//             <Route path='/orders' element={<OrderHistoryPage />} />
//           </Routes>
//         </>
//         :
//         <AuthPage setUser={setUser} />
//       }
//     </main>
//   );
// }
