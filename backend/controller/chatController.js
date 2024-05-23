const Chat = require('../model/Chat');
const { sendMessage } = require('../utils/socket-io');

exports.sendChatMessage = async (req, res) => {
  try {
    const { sender_id,receiver_id, message } = req.body;
    // Save message to database with sender information
    await Chat.findOneAndUpdate({_id:req.params.id},{$push: { messages: {receiver_id:receiver_id,sender_id:sender_id,message:message}}});
    // Emit the message to the receiver via WebSocket
    // io.emit("chat message", { sender_id, receiver_id, message });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getChatDetails = async (req,res)=>{
  try{
    const { chatId } = req.params;
    
    // Fetch messages where either sender_id or receiver_id matches the pair
    console.log(chatId);
    const chat = await Chat.findOne({_id:chatId},{sender_id:1,receiver_id:1,ticket_id:1}).populate('sender_id',{username:1}).populate('receiver_id',{username:1});
    let newChat={...chat._doc,senderDetails:chat.sender_id,receiverDetails:chat.receiver_id,sender_id:chat.sender_id._id,receiver_id:chat.receiver_id._id}
    console.log(`Chat found: ${JSON.stringify(newChat)}`);

    res.status(200).json(newChat); 
  }
  catch(err){
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
exports.getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    
    // Fetch messages where either sender_id or receiver_id matches the pair
    const chat = await Chat.findById(chatId);

    res.status(200).json(chat.messages  );
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  exports.closeAndDeleteChat = async (req, res) => {
    try {
      const { chatId } = req.params;
  
      // Delete the chat entry from the database
      await Chat.findByIdAndDelete(chatId);
  
      //  io.emit('chatClosed', { chatId });
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error closing and deleting chat:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};
