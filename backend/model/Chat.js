const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
  ticket_id:{ type: mongoose.Schema.Types.ObjectId,ref:"Ticket", required: true },
  messages: [
    { 
      type: Object,
    }
  ],
  created_at: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
