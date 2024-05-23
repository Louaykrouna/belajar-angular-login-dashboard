const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticketController');
const { isAuth, isAdminSupp, isUser,isSupp,isUserSupp } = require('../middleware/auth');


const usermiddleware=[isAuth,isUser]
// Create a new ticket
router.post('/api/tickets',usermiddleware, ticketController.createTicket);
router.get('/api/tickets/:id', isAuth, ticketController.getTicketByTicketId);

// Get all tickets
router.get('/api/admin/tickets', isAdminSupp, ticketController.getAllTickets);
// get my ticket
router.get('/api/users/tickets', usermiddleware, ticketController.getmyticket);

router.get('/api/tickets/user/:id', isUser, ticketController.getTicketById);

// Update a ticket for user
router.put('/api/tickets/user/:id', isUser, ticketController.updateTicketForUser);
// Update a ticket for support
router.get('/api/tickets/support/:id', isSupp, ticketController.getTicketById);
router.post('/api/tickets/support/:id/accept', isSupp, ticketController.acceptTicket);

router.put('/api/tickets/support/:id', isSupp, ticketController.updateTicketForSupport);

// Delete a ticket
router.delete('/api/tickets/:id', isUserSupp, ticketController.deleteTicket);

module.exports = router;
