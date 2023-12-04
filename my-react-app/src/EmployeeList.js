// src/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeList.css';


function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8089/api/v1/emp/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <table className="employee-list-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>${employee.salary}</td>
              <td>
                <button onClick={() => {/* Handle Update */}}>Update</button>
                <button onClick={() => {/* Handle Delete */}}>Delete</button>
                <button onClick={() => {/* Handle View Details */}}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
