const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentProvider: { type: String, required: true },
  recipientAccountNumber: { type: String, required: true },
  recipientSWIFTCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', PaymentSchema);
