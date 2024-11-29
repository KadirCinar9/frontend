import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Alert, Grid } from '@mui/material'; // Use standard Grid

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError('Failed to fetch employee details.');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`http://localhost:5000/api/v1/emp/employees/${id}`, employee, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Failed to update employee. Please try again.');
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
        Edit Employee
      </Typography>

      {/* Display error message if any */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: '20px' }}>
          {error}
        </Alert>
      )}

      {/* Form to capture updated employee details */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ marginLeft: '10px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="first_name"
              value={employee.first_name || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="last_name"
              value={employee.last_name || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={employee.email || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Position"
              name="position"
              value={employee.position || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Department"
              name="department"
              value={employee.department || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Salary"
              name="salary"
              type="number"
              value={employee.salary || ''}
              onChange={handleChange}
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
              value={employee.date_of_joining || ''}
              onChange={handleChange}
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
              Update Employee
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditEmployee;
