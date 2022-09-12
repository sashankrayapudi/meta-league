import { useState } from 'react';
// import './AuthPage.css'
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { CssBaseline } from '@mui/material';

import favre from '../../assets/favre.png'

import { styled } from '@mui/system';


const MyMain = styled('div')({
  minHeight: '100vh',
  backgroundImage: `url(${favre})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

const MySpan = styled('span')({
  color: '#800080',
})

const MyH1 = styled('h1')({
  fontFamily: 'Nunito',
  fontSize: '3.5rem',
  textAlign: 'center',
  marginTop: '10vmin'
})

const ButtonDiv = styled('div')({
  textAlign: 'center'
})

const Button = styled('button')({
  margin: '1vmin',
  padding: '1vmin',
  color: 'white',
  backgroundColor: 'rgba(0,0,0,0.5)',
  fontSize: '2vmin',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  border: '.1vmin rgba(0,0,0,0.5)',
  borderRadius: '.5vmin',
  outline: 'none',
  cursor: 'pointer',
})

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
      <MyMain>
        <CssBaseline />
        <MyH1><MySpan>Meta</MySpan> League</MyH1>
        <ButtonDiv>
          <Button onClick={() => setShowLogin(!showLogin)} >
            {showLogin ? 'Sign Up' : 'Log In'}
          </Button>
        </ButtonDiv>
        { showLogin ?
            <LoginForm setUser={setUser} />
            :
            <SignUpForm setUser={setUser} />
        }
      </MyMain>
  );
}