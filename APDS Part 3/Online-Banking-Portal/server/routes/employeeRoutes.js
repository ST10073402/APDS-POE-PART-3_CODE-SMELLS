const express = require('express');
const { registerEmployee, loginEmployee, verifyPayment } = require('../controllers/employeeController');

const router = express.Router();

// Employee login
router.post('/login', loginEmployee);

// Register employee
router.post('/register', registerEmployee);


// Verify payment
router.post('/verify-payment/:paymentId', verifyPayment);

module.exports = router;
