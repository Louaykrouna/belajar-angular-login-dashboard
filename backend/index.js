const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/auth'); // Import authentication middleware
const bodyParser = require('body-parser');
const connectDB = require('./config/mongoose');
const User = require('./model/User');
const Chat = require('./model/Chat');
const cookie = require('cookie-parser');
const routes = require('./routes/users.routes');
const authroute = require('./routes/auth.routes');
const ticketRouter = require('./routes/tickets.routes');
const { isAuth, isUser } = require('./middleware/auth');
isSupp= require('./middleware/auth').isSupp;
const chatmiddleware=[authMiddleware.isUserSupp];
isUserSupp= require('./middleware/auth').isUserSupp
const chatRouter = require('./routes/chats.routes');
const reviewRouter = require('./routes/reviews.routes');
const app = express();
const server = http.createServer(app);
const { socketConnection } = require('./utils/socket-io');
var cors = require('cors')
socketConnection(server)
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  };
  
  app.use(cors(corsOptions));
  


const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cookie());

// Define your route for sending messages
const jwt = require('jsonwebtoken');
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
// app.post("/api/chat/send", async (req, res) => {
//     try {
//         const { receiverId, message } = req.body;
//         const token = req.cookies.token;

//         console.log("Token:", token); // Print token

//         // Verify the token to get senderId
//         const decoded = jwt.verify(token, 'alizethdigital1');
//         const senderId = decoded.userId;

//         console.log("Decoded Token:", decoded); // Print decoded token

//         // Check if sender and receiver roles are allowed
//         if (!await authMiddleware.checkSenderReceiverRoles(senderId, receiverId)) {
//             // If sender and receiver roles are not allowed, return 403 Forbidden
//             return res.status(403).json({ error: "Unauthorized" });
//         }

//         // Save message to database with sender information
//         await Chat.create({
//             sender_id: senderId,
//             receiver_id: receiverId,
//             message: message,
//         });

//         // Emit the message to the receiver via WebSocket
//         io.emit("chat message", { senderId, receiverId, message });

//         res.status(200).json({ success: true });
//     } catch (error) {
//         console.error("Error sending message:", error);
//         if (error.name === "JsonWebTokenError") {
//             res.status(401).json({ error: "Invalid token" });
//         } else {
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     }
// });

// Your other routes
app.use(chatRouter);
app.use(authroute);
app.use(routes);
app.use(ticketRouter);
app.use(reviewRouter);

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
