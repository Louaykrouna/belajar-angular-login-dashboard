let io; 
exports.socketConnection = (server) => {
  let listOfRoom = [];
  io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ["GET", "POST"],
      credentials: true
    }  
  });
  // const joinUserInRoom = (socket,roomId) => {
  //   if (socket.adapter.rooms.has(roomId) === false) {
  //       listOfRoom.push(roomId);
  //       socket.join(roomId);
  //       console.log(`User joined room: ${roomId}`);
  //   }
  // }
  // const leaveUserInRoom = (socket,roomId) => {
  //     if (listOfRoom.includes(roomId)) {
  //         listOfRoom.splice(listOfRoom.indexOf(roomId), 1);
  //         socket.leave(roomId);
  //         console.log(`User left room: ${roomId}`);

  //     }
  // };
  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('joinRoom', data => {
      // joinUserInRoom(socket,data.roomId);
      const roomId = data.roomId;
      console.log(`User ${socket.id} joining room: ${roomId}`);
      socket.join(roomId);
      io.to(roomId).emit('eventChatMsg', `${socket.id} has joined the room`);

    })

    socket.on('chat-msg', data => {
      console.log(`Message received from ${socket.id}: ${data.message.message} in room ${data.roomId}`);
      io.to(data.roomId).emit('eventChatMsg', data.message); // send data in special room
  });
    // socket.on('chat-msg', (id,message) => {
    //   io.to(id).emit('chat-msg', message);
    // });
    // socket.on('closeChat', () => {
    //   io.to(id).emit('closeChat', "Chat Closed");
    // });
    socket.on('disconnect', data => {
      // listOfRoom.forEach(roomId => leaveUserInRoom(socket, roomId));
      console.log('Client disconnected', socket.id);

    });

  });
};