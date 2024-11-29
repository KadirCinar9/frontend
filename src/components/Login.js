import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Alert, Grid } from '@mui/material'; // Import Material UI components

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/login', { email, password });
      localStorage.setItem('token', response.data.jwt_token);
      navigate('/employees');  // Navigate to Employee List after login
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');  // Navigate to Sign Up page when clicked
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" component="h2" sx={{ marginBottom: '20px', textAlign: 'center' }}>
        Login
      </Typography>

      {/* Display error message if any */}
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: '20px' }}>
          {errorMessage}
        </Alert>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Sign Up Redirect */}
      <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
        <Grid item>
          <Button variant="outlined" onClick={handleSignUp}>
            Don't have an account? Sign Up
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
