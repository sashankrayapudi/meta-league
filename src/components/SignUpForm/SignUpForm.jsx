import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

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
  textDecoration: 'none',
  textAlign: 'center',
  border: '.1vmin rgba(0,0,0,0.5)',
  borderRadius: '.5vmin',
  outline: 'none',
  cursor: 'pointer',
})

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = {...this.state};
      delete formData.confirm;
      delete formData.error;
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occurred, like a dup email address
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  
  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <FormDiv>
          <Form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <Button type="submit" disabled={disable}>SIGN UP</Button>
          </Form>
        </FormDiv>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
  
}