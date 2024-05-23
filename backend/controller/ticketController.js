const Ticket = require('../model/Ticket');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Chat = require('../model/Chat');

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const createdBy = req.user.userId; // Assuming you have authentication middleware to attach user information to the request

    const ticket = new Ticket({ title, description, createdBy });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getTicketByTicketId = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error getting tickets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.acceptTicket = async (req, res) => {
  try {
    // Extract the ticket ID from the request body
    const { _id } = req.body.ticket;
    console.log(_id);

    // Extract the JWT token from the cookie
    const token = req.cookies.token; // Assuming the JWT token is stored in a cookie named 'jwt'

    // Verify the JWT token and extract the support member's ID
    const decodedToken = jwt.verify(token, 'alizethdigital1'); // Replace 'your_secret_key' with your actual secret key
    const supportId = decodedToken.userId; // Assuming the support member's ID is stored in the token under 'userId'

    // Update the ticket with the support member's ID and set status to "In Progress"
    const updatedTicket = await Ticket.findByIdAndUpdate(_id, { status: "In Progress", support_id: supportId  }, { new: true });
    let newChat = new Chat({
      sender_id:supportId,
      receiver_id:updatedTicket.createdBy,
      ticket_id:updatedTicket._id
    });
    await newChat.save()
    .then(async (ss)=>{
      await Ticket.findByIdAndUpdate(_id, { chatId :ss._id })
      res.status(200).json(updatedTicket);
    })
    .catch((err)=>{
      res.status(404).json(err);
    })
    

  } catch (error) {
    console.error('Error accepting ticket:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('createdBy', 'username').exec();
    res.json(tickets);
  } catch (error) {
    console.error('Error getting tickets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getmyticket = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decodedToken = jwt.verify(token, 'alizethdigital1');
    const { userId } = decodedToken;
    
    const mytickets = await Ticket.find({ createdBy: userId }).populate('createdBy','username');
    res.json(mytickets);
  } catch (error) {
    console.error('Error getting your tickets:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decodedToken = jwt.verify(token, 'alizethdigital1');
    const { userId } = decodedToken;
    
    const mytickets = await Ticket.findOne({ _id:req.params.id });
    res.json(mytickets);
  } catch (error) {
    console.error('Error getting your tickets:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Update a ticket
// For Normal User
exports.updateTicketForUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      const updatedTicket = await Ticket.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
  
      if (!updatedTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      res.json(updatedTicket);
    } catch (error) {
      console.error('Error updating ticket for user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
  // For Support Team Member
exports.updateTicketForSupport = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const options = { new: true };
  
      const updatedTicket = await Ticket.findByIdAndUpdate(id, updates, options);
  
      if (!updatedTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      res.json(updatedTicket);
    } catch (error) {
      console.error('Error updating ticket for support:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
// Delete a ticket
exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
