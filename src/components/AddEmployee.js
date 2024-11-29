import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Alert } from '@mui/material';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Make a POST request to the backend API to add a new employee
      const response = await axios.post(
        'http://localhost:5000/api/v1/emp/employees',
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      if (response.data.message === 'Employee created successfully.') {
        // On success, navigate to the employee list page
        navigate('/employees');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Failed to add employee. Please try again.');
    }
  };

  return (
    <div>
      {/* Page Heading */}
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ marginLeft: '10px', marginBottom: '20px' }}
      >
        Add Employee
      </Typography>

      {/* Display error message if any */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: '20px' }}>
          {error}
        </Alert>
      )}

      {/* Form to capture employee details */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ marginLeft: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Joining"
              name="date_of_joining"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date_of_joining}
              onChange={handleInputChange}
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
              sx={{ marginTop: '20px' }}
            >
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEmployee;
