// LoginForm.jsx

import { useState } from 'react';


export default function SleeperUserForm({ pullSleeperUser }) {
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
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Sleeper Username:</label>
          <input type="text" name="sleeperUsername" value={sleeperUsername} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
