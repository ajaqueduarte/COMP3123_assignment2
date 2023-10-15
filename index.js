var express = require('express');
var app = express();
app.use(express.json());

const PORT = process.env.PORT || 8089;

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comp3123_assigment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Schema = mongoose.Schema;

// emplyee schema
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const employeeSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 50 },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'], maxlength: 25 },
  salary: { type: Number, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;


//user Schema


const userSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  username: { type: String, required: true, unique: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 50 },
  password: { type: String, required: true, maxlength: 50 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;



// check application is running

app.get("/", (req, res)=>{
  res.write("Application is running");
  res.end();
})

//1
app.post('/api/v1/user/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Create a new user instance
  const newUser = new User({ username, email, password });

  // Save the user to the MongoDB database
  newUser.save()
  .then(_savedUser => {
    res.status(201).json({ message: 'User account created successfully' });
  })
  .catch(_err => {
    res.status(500).json({ error: 'Failed to create user' });
  });
});


//2
app.post('/api/v1/user/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password }).exec();

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In a real application, you would typically create a session or token for the user to authenticate future requests
    res.status(200).json({ message: 'User authenticated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

//3
// Route to get a list of all employees
app.get('/api/v1/emp/employees', async (req, res) => {
  try {
    // Retrieve all employees from the MongoDB database
    const employees = await Employee.find({}).exec();

    if (!employees) {
      return res.status(404).json({ error: 'No employees found' });
    }

    res.status(200).json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Task 4: Route to create a new employee
app.post('/api/v1/emp/employees', async (req, res) => {
  const { first_name, last_name, email, gender, salary } = req.body;

  // Perform validation on the data (e.g., check for required fields)
  if (!first_name || !last_name || !email || !gender || !salary) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    // Create a new employee instance
    const newEmployee = new Employee({ first_name, last_name, email, gender, salary });

    // Save the new employee to the MongoDB database
    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create employee' });
  }
});




//5
// Task 5: Route to get employee details by ID
app.get('/api/v1/emp/employees/:eid', async (req, res) => {
  const employeeId = req.params.eid;

  try {
    // Find the employee by their ID in the MongoDB database
    const employee = await Employee.findById(employeeId).exec();

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});


//6
// Task 6: Route to update employee details by ID
app.put('/api/v1/emp/employees/:eid', async (req, res) => {
  try {
    const employeeId = req.params.eid;
    const updateData = req.body;

    // Use the `findByIdAndUpdate` method with `await`
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updateData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});



//7
// Task 7: Route to delete an employee by ID
app.delete('/api/v1/emp/employees/:eid', async (req, res) => {
  try {
    const employeeId = req.params.eid;

    // Use the `findByIdAndRemove` method with `await`
    const removedEmployee = await Employee.findByIdAndRemove(employeeId);

    if (!removedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});