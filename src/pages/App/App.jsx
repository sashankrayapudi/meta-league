import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import Landing from '../Landing/Landing'
import LeaguePage from '../LeaguePage'
import LeagueBlog from '../LeagueBlog'
import LeagueConstitution from '../LeagueConstitution'
// import './App.css';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
      <main className="App">
        { user ?
          <>
            {/* <NavBar user={user} setUser={setUser} /> */}
            <Routes>
              <Route path='/' element={<Landing user={user} setUser={setUser} />} />
              <Route path='/leagues/:sleeperUser/:leagueId' element={<LeaguePage />} />
              <Route path='/leagues/:sleeperUser/:leagueId/blog' element={<LeagueBlog />} />
              <Route path='/leagues/:sleeperUser/:leagueId/constitution' element={<LeagueConstitution />} />
              {/* <Route path='/orders/new' element={<NewOrderPage />} />
              <Route path='/orders' element={<OrderHistoryPage />} /> */}
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
        }
      </main>
  );
}
