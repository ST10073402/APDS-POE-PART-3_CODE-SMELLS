const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const Payment = require('../models/Payment');

exports.registerCustomer = async (req, res) => {
  const { fullName, idNumber, accountNumber, password } = req.body;

  // Regex patterns
  const idNumberPattern = /^[A-Z0-9]{8,15}$/; // Example: ID number should be alphanumeric, 8 to 15 characters long
  const accountNumberPattern = /^\d{10}$/; // Example: Account number should be exactly 10 digits
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Password should contain at least one letter, one number, and be 8+ characters long

  const errors = validationResult(req);

  // Check if there are validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Validate using regex
  if (!idNumberPattern.test(idNumber)) {
    return res.status(400).json({ message: 'Invalid ID number format' });
  }

  if (!accountNumberPattern.test(accountNumber)) {
    return res.status(400).json({ message: 'Account number must be exactly 10 digits' });
  }

  if (!passwordPattern.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long, contain at least one letter and one number' });
  }

  try {
    // Check if customer exists
    let customer = await Customer.findOne({ idNumber });
    if (customer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    customer = new Customer({
      fullName,
      idNumber,
      accountNumber,
      password: hashedPassword,
    });

    await customer.save();
    res.status(201).json({ message: 'Customer registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a customer
exports.loginCustomer = async (req, res) => {
  const { accountNumber, password } = req.body;

  try {
    const customer = await Customer.findOne({ accountNumber });
    if (!customer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      customerId: customer.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Make a payment
exports.makePayment = async (req, res) => {
  const { amount, currency, paymentProvider, recipientAccountNumber, recipientSWIFTCode } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const defaultSWIFTCode = 'SBZAZAJJ'; // Default SWIFT code for Standard Bank of South Africa
  const swiftCode = recipientSWIFTCode || defaultSWIFTCode;

  const token = req.headers['authorization'];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findById(decoded.customerId);
    if (!customer) {
      return res.status(401).json({ message: 'Customer not found' });
    }

    const payment = new Payment({
      customerId: customer._id,
      amount,
      currency,
      paymentProvider,
      recipientAccountNumber,
      recipientSWIFTCode: swiftCode,
    });

    await payment.save();
    res.status(201).json({ message: 'Payment initiated successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

// Fetch payments for employee dashboard
exports.fetchPayments = async (req, res) => {
  try {
      const payments = await Payment.find(); // Adjust query as needed (e.g., filtering, sorting)
      res.status(200).json(payments);
  } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ message: 'Failed to fetch payments' });
  }
};
