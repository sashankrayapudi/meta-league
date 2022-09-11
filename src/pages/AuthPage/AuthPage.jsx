import { useState } from 'react';
// import './AuthPage.css'
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { CssBaseline } from '@mui/material';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'

import favre from '../../assets/favre.png'

import { styled } from '@mui/system';


const MyMain = styled('div')({
  minHeight: '100vh',
  backgroundImage: `url(${favre})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

})

const MySpan = styled('span')({
  color: '#800080',
})

const MyH1 = styled('h1')({
  fontFamily: 'Nunito',
  fontSize: '2.5rem'
})

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
      <MyMain>
        <MyH1 className="align-ctr"><MySpan>Meta</MySpan> League</MyH1>
        <div className="align-ctr">
          <button onClick={() => setShowLogin(!showLogin)} >
            {showLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
        { showLogin ?
            <LoginForm setUser={setUser} />
            :
            <SignUpForm setUser={setUser} />
        }
      </MyMain>
  );
}