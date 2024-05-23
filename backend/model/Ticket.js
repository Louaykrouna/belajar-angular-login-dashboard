const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  support_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Modify as per your requirements
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  chatId :{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Chat'
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
