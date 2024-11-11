const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Payment = require('../models/Payment');

// Employee Login
exports.loginEmployee = async (req, res) => {
  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne({ username });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    // Generate JWT token for employee
    const payload = {
      employeeId: employee.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Employee Registration
exports.registerEmployee = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingEmployee = await Employee.findOne({ username });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee instance
    const employee = new Employee({
      username,
      password: hashedPassword,
    });

    // Save the new employee to the database
    await employee.save();

    // Generate a JWT token for the new employee
    const payload = {
      employeeId: employee.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Employee registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.verified = true;
    await payment.save();
    res.json({ message: 'Payment verified successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
