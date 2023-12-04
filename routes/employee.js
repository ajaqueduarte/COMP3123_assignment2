const express = require('express');
const router = express.Router();
const Employee = require('../models/employee'); // Adjust the path as necessary

// Get all employees route
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create an employee route
router.post('/employees', async (req, res) => {
  const { first_name, last_name, email, gender, salary } = req.body;

  const newEmployee = new Employee({ first_name, last_name, email, gender, salary });
  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get employee by ID route
router.get('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update employee route
router.put('/employees/:eid', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete employee route
router.delete('/employees/:eid', async (req, res) => {
  try {
    const removedEmployee = await Employee.findByIdAndRemove(req.params.eid);
    if (!removedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
