import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material'; // Use standard MUI components
import '../EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // List of all employees
  const [department, setDepartment] = useState(''); // Search by department
  const [position, setPosition] = useState(''); // Search by position
  const navigate = useNavigate();

  // Fetch all employees on initial load
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/emp/employees', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEmployees(response.data); // Update employees list
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const params = {}; // Collect search params
    if (department) params.department = department;
    if (position) params.position = position;

    console.log('Search Params:', params); // Log the parameters

    try {
      const response = await axios.get('http://localhost:5000/api/v1/emp/search', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params, // Only send populated search params
      });
      setEmployees(response.data); // Update employees with search results
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  // Handle employee deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(employees.filter(employee => employee._id !== id)); // Remove deleted employee from the list
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <Typography variant="h4" component="h2" sx={{ marginLeft: '10px', marginBottom: '20px' }}>
        Employee List
      </Typography>

      {/* Logout Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        style={{ marginTop: '20px', marginLeft: '10px', marginBottom:'30px' }}
      >
        Logout
      </Button>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} sx={{ marginLeft: '20px' }}>
            <TextField
              label="Search by Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ marginLeft: '10px' }}>
            <TextField
              label="Search by Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}sx={{ marginLeft: '10px' }}>
            <Button type="submit" variant="contained" fullWidth>
              Search
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Button to add new employee */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/employees/add')}
        style={{ marginTop: '20px', marginLeft: '10px' }}
      >
        Add Employee
      </Button>

      {/* Employee Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map(employee => (
            <TableRow key={employee._id}>
              <TableCell>{employee.first_name} {employee.last_name}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/employees/${employee._id}`)}>Details</Button>
                <Button onClick={() => navigate(`/employees/edit/${employee._id}`)}>Edit</Button>
                <Button onClick={() => handleDelete(employee._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeList;
