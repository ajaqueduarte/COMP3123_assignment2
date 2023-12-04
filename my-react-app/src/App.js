// src/App.js
import React from 'react';
import Signup from './Signup';
import Login from './Login';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';

function App() {
  return (
    <div className="App">
      <h1>User Signup</h1>
      <Signup />
      <h1>User Login</h1>
      <Login />
      <h1>Add Employee</h1>
      <AddEmployee />
      <h1>Employee List</h1>
      <EmployeeList />
    </div>
  );
}

export default App;
