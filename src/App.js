import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeDetails from './components/EmployeeDetails';

<Route path="*" element={<h1>404 - Page Not Found</h1>} />

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect the root route to the Signup page */}
        <Route path="/" element={<Navigate to="/signup" />} />
        
        {/* Other routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
