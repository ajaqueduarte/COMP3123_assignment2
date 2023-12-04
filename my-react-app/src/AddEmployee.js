// src/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css'; 

function AddEmployee() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8089/api/v1/emp/employees', {
        first_name, last_name, email, gender, salary,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="add-employee-form">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
        <button type="submit">Save</button>
        <button type="button" onClick={() => {/* cancel logic here */}}>Cancel</button>
      </form>
    </div>
  );
}

export default AddEmployee;
