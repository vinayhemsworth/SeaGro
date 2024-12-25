import Message from '../models/Message.js';
import { verifyToken } from '../utils/auth.js';

export default function setupChatHandlers(io) {
  const typingUsers = new Map();

  io.on('connection', (socket) => {
    let currentUser = null;

    socket.on('auth', async (token) => {
      try {
        const user = await verifyToken(token);
        currentUser = user;
        socket.user = user;
      } catch (error) {
        socket.emit('error', 'Authentication failed');
      }
    });

    socket.on('join-room', async (roomId) => {
      if (!currentUser) return;
      
      socket.join(roomId);
      
      // Load previous messages
      const messages = await Message.find({ room: roomId })
        .sort('-createdAt')
        .limit(50)
        .populate('sender', 'username');
      
      socket.emit('previous-messages', messages);
    });

    socket.on('send-message', async (data) => {
      if (!currentUser) return;

      const { content, roomId } = data;
      
      const message = new Message({
        content,
        sender: currentUser._id,
        room: roomId
      });
      
      await message.save();
      
      const populatedMessage = await message.populate('sender', 'username');
      
      io.to(roomId).emit('new-message', populatedMessage);
    });

    socket.on('typing', (roomId) => {
      if (!currentUser) return;
      
      typingUsers.set(`${currentUser._id}-${roomId}`, Date.now());
      io.to(roomId).emit('typing-update', {
        user: currentUser.username,
        isTyping: true
      });
      
      // Clear typing indicator after 2 seconds of inactivity
      setTimeout(() => {
        const lastType = typingUsers.get(`${currentUser._id}-${roomId}`);
        if (Date.now() - lastType >= 2000) {
          typingUsers.delete(`${currentUser._id}-${roomId}`);
          io.to(roomId).emit('typing-update', {
            user: currentUser.username,
            isTyping: false
          });
        }
      }, 2000);
    });

    socket.on('edit-message', async (data) => {
      if (!currentUser) return;

      const { messageId, content } = data;
      const message = await Message.findById(messageId);
      
      if (message && message.sender.toString() === currentUser._id.toString()) {
        message.content = content;
        message.edited = true;
        await message.save();
        
        const populatedMessage = await message.populate('sender', 'username');
        io.to(message.room).emit('message-updated', populatedMessage);
      }
    });

    socket.on('delete-message', async (messageId) => {
      if (!currentUser) return;

      const message = await Message.findById(messageId);
      
      if (message && message.sender.toString() === currentUser._id.toString()) {
        message.deleted = true;
        message.content = 'This message has been deleted';
        await message.save();
        
        io.to(message.room).emit('message-deleted', messageId);
      }
    });

    socket.on('disconnect', () => {
      if (currentUser) {
        // Clean up typing indicators
        for (const [key, value] of typingUsers.entries()) {
          if (key.startsWith(currentUser._id.toString())) {
            typingUsers.delete(key);
          }
        }
      }
    });
  });
}