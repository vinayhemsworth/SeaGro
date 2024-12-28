import Message from '../models/Message.js';
import { verifyToken } from '../utils/auth.js';

export default function setupChatHandlers(io) {
  const connectedUsers = new Map();
  const typingUsers = new Map();

  io.on('connection', async (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    let currentUser = null;

    socket.on('auth', async (token) => {
      try {
        const user = await verifyToken(token);
        if (!user) throw new Error('Invalid token');
        
        currentUser = user;
        socket.user = user;
        connectedUsers.set(user._id.toString(), socket.id);
        console.log(`User authenticated: ${user._id}`);
      } catch (error) {
        console.error(`Authentication failed: ${error.message}`);
        socket.emit('error', 'Authentication failed');
      }
    });

    socket.on('join-room', async (roomId) => {
      try {
        if (!currentUser) throw new Error('Not authenticated');
        
        socket.join(roomId);
        console.log(`User ${currentUser._id} joined room: ${roomId}`);

        const messages = await Message.find({ room: roomId })
          .sort('-createdAt')
          .limit(50)
          .populate('sender', 'name');
          
        socket.emit('previous-messages', messages.reverse());
      } catch (error) {
        console.error(`Join room failed: ${error.message}`);
        socket.emit('error', 'Failed to join room');
      }
    });

    socket.on('send-message', async ({ content, roomId }) => {
      try {
        if (!currentUser) throw new Error('Not authenticated');
        if (!content || !roomId) throw new Error('Invalid message data');

        const message = new Message({
          content,
          sender: currentUser._id,
          room: roomId
        });
        await message.save();

        io.to(roomId).emit('new-message', {
          _id: message._id,
          content: message.content,
          sender: currentUser._id,
          room: roomId,
          createdAt: message.createdAt
        });
      } catch (error) {
        console.error(`Send message failed: ${error.message}`);
        socket.emit('error', 'Failed to send message');
      }
    });

    socket.on('typing', (roomId) => {
      if (!currentUser) return;
      
      const key = `${currentUser._id}-${roomId}`;
      if (!typingUsers.has(key)) {
        typingUsers.set(key, setTimeout(() => {
          typingUsers.delete(key);
          io.to(roomId).emit('typing-update', {
            user: currentUser._id,
            isTyping: false
          });
        }, 2000));
        
        io.to(roomId).emit('typing-update', {
          user: currentUser._id,
          isTyping: true
        });
      }
    });

    socket.on('disconnect', () => {
      if (currentUser) {
        console.log(`User disconnected: ${currentUser._id}`);
        connectedUsers.delete(currentUser._id.toString());
      }
    });
  });
}