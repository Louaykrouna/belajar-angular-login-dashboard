const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');
const { isAuth , isUser, isSupp, checkSenderReceiverRoles } = require('../middleware/auth');
const usermiddleware=[isAuth,isUser];
const suppmiddleware=[isAuth,isSupp];
// Define your route for sending messages
router.post("/api/chat/:id/send", isAuth,chatController.sendChatMessage);
router.get('/api/chat/:chatId', isAuth, chatController.getChatDetails);
router.get('/api/chat/:chatId/messages', isAuth, chatController.getChatMessages);
router.get('/api/chats/:senderId/:receiverId/messages', isAuth, chatController.getChatMessages);
module.exports = router;
