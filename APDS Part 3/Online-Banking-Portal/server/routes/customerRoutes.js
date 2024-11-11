const express = require('express');
const { body } = require('express-validator');
const { registerCustomer, loginCustomer, makePayment, fetchPayments } = require('../controllers/customercontroller');


const router = express.Router();

// Register a customer
router.post('/register', [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('idNumber').notEmpty().withMessage('ID number is required'),
  body('accountNumber').notEmpty().withMessage('Account number is required'),
  body('password').notEmpty().withMessage('Password is required'),
], registerCustomer);

// Customer login
router.post('/login', loginCustomer);

// Make payment
router.post('/make-payment', [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('currency').notEmpty().withMessage('Currency is required'),
  body('paymentProvider').notEmpty().withMessage('Payment provider is required'),
  body('recipientAccountNumber').notEmpty().withMessage('Recipient account number is required'),
], makePayment);


router.get('/payments', fetchPayments);

module.exports = router;
