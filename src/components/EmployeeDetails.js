import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Alert, Button, CircularProgress } from '@mui/material';

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details.');
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (error) {
    return (
      <Alert severity="error" sx={{ marginBottom: '20px' }}>
        {error}
      </Alert>
    );
  }

  if (!employee) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    ); // Add a loading spinner while data is being fetched
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" component="h2" sx={{ marginBottom: '20px', textAlign: 'center' }}>
        Employee Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Name:</strong> {employee.first_name} {employee.last_name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Position:</strong> {employee.position}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Department:</strong> {employee.department}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Email:</strong> {employee.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Salary:</strong> {employee.salary}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Date of Joining:</strong> {employee.date_of_joining}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/employees/edit/${id}`)}
            sx={{ marginTop: '20px' }}
          >
            Edit Employee
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeDetails;
