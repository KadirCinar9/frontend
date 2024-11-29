import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Grid, Alert } from '@mui/material'; // Import Material UI components

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the signup request
      const response = await axios.post('http://localhost:5000/api/v1/user/signup', {
        username,
        email,
        password
      });

      console.log('Response:', response.data);
      navigate('/login'); // Redirect to login on successful signup
    } catch (error) {
      console.error('Error:', error.response.data);
      setErrorMessage('Error creating account. Please try again.');
    }
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to Login page when clicked
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" component="h2" sx={{ marginBottom: '20px', textAlign: 'center' }}>
        Sign Up
      </Typography>

      {/* Display error message if any */}
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: '20px' }}>
          {errorMessage}
        </Alert>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
          </Grid>
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
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Login Redirect */}
      <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
        <Grid item>
          <Button variant="outlined" onClick={handleLogin}>
            Already have an account? Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
