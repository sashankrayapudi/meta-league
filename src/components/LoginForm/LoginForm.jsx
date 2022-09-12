// LoginForm.jsx

import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

import { styled } from '@mui/system';



const FormDiv = styled('div')({
  padding: '3vmin',
  backgroundColor: 'rgba(128,0,128,0.4)',
  border: '.1vmin solid rgba(0,0,0,0.5)',
  borderRadius: '1vmin',
})

const Form = styled('form')({
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  gridTemplateRows: 'auto',
  gap: '1.25vmin',
  color: 'white',
})


const Button = styled('button')({
  margin: '1vmin',
  padding: '1vmin',
  color: 'white',
  backgroundColor: 'rgba(0,0,0,0.5)',
  fontSize: '2vmin',
  fontWeight: 'bold',
  textAlign: 'center',
  textDecoration: 'none',
  border: '.1vmin rgba(0,0,0,0.5)',
  borderRadius: '.5vmin',
  outline: 'none',
  cursor: 'pointer',
})



export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <FormDiv>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <label>EMAIL</label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label>PASSWORD</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <Button type="submit">LOG IN</Button>
        </Form>
      </FormDiv>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
