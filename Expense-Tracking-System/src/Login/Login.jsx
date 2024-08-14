import './Login.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Define the authenticate function here
  const authenticate = (username, password) => {
    // Define valid credentials (for demonstration purposes)
    const VALID_USERNAME = 'Samyam';
    const VALID_PASSWORD = '1234';

    // Check if the provided username and password match the valid credentials
    return username === VALID_USERNAME && password === VALID_PASSWORD;
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Call the authenticate function
    const isValid = authenticate(username, password);

    if (isValid) {
      // Navigate to Home page on successful login
      navigate('/home');
    } else {
      // Set error message on failed login
      setError('Invalid username or password!');
    }
  };

  return (
    <div className="Login">
      <section>
        <div className='color'></div>
        <div className='color'></div>
        <div className='color'></div>
        <div className='box'>
          <div className='square' style={{ '--i': 0 }}></div>
          <div className='square' style={{ '--i': 1 }}></div>
          <div className='square' style={{ '--i': 2 }}></div>
          <div className='square' style={{ '--i': 3 }}></div>
          <div className='square' style={{ '--i': 4 }}></div>
          <div className='container'>
            <h2>Login Form</h2>
            <form onSubmit={handleLogin}>
              <div className='inputBox'>
                <input
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='inputBox'>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='inputBox'>
                <input type='submit' value="Login" />
              </div>
              {error && <p className='error'>{error}</p>}
              <p>Forgot Password? <a href='#'>Click here</a></p>
              <p>Don't have an account? <a href='#'>Sign up</a></p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
