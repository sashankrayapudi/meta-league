// LoginForm.jsx

import { useState } from 'react';
import { styled } from '@mui/system';

import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button'

import BasicMenu from '../components/BasicMenu/BasicMenu'

const RootDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Nunito',
})

export default function SleeperUserForm({ pullSleeperUser, setUser }) {
  const [sleeperUsername, setSleeperUsername] = useState("");
  const [error, setError] = useState('');

  function handleChange(evt) {
    setSleeperUsername(evt.target.value);
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      // const user = await usersService.login(credentials);
      // setUser(user);
      pullSleeperUser(sleeperUsername)
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <RootDiv>
      <div className="form-container"  >
        <form autoComplete="off" onSubmit={handleSubmit} >
          <FormLabel style={{color: 'white', fontFamily: 'Nunito'}}>Sleeper Username: </FormLabel>
          <Input type="text" variant="filled" name="sleeperUsername" value={sleeperUsername} onChange={handleChange} style={{color: 'white', fontFamily: 'Nunito'}} required />
          <Button type="submit" size='small' style={{ fontSize: '1rem', fontFamily: 'Nunito', margin: '0.5rem'}}  >Submit</Button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </RootDiv>
  );
}
