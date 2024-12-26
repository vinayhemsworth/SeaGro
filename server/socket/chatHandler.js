import Message from '../models/Message.js';
import { verifyToken } from '../utils/auth.js';

export default function setupChatHandlers(io) {
  const connectedUsers = new Map();
  const typingUsers = new Map();

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    let currentUser = null;

    // Authenticate user
    socket.on('auth', async (token) => {
      try {
        const user = await verifyToken(token);
        if (!user) {
          throw new Error('Invalid token');
        }
        currentUser = user;
        socket.user = user;
        connectedUsers.set(user._id.toString(), socket.id);
        console.log(`User authenticated: ${user._id}`);
      } catch (error) {
        console.error(`Authentication failed: ${error.message}`);
        socket.emit('error', 'Authentication failed');
        socket.disconnect();
      }
    });

    // Join a room
    socket.on('join-room', async (roomId) => {
      try {
        if (!currentUser) throw new Error('User not authenticated');
        socket.join(roomId);
        console.log(`User ${currentUser._id} joined room: ${roomId}`);

        // Load previous messages
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

    // Send message
    socket.on('send-message', async ({ content, roomId }) => {
      try {
        if (!currentUser) throw new Error('User not authenticated');
        if (!content || !roomId) throw new Error('Invalid data');

        const message = new Message({
          content,
          sender: currentUser._id,
          room: roomId,
        });
        await message.save();

        console.log(`Message sent to room ${roomId}: ${message.content}`);
        io.to(roomId).emit('new-message', {
          _id: message._id,
          content: message.content,
          sender: currentUser._id,
          room: roomId,
          createdAt: message.createdAt,
        });
      } catch (error) {
        console.error(`Send message failed: ${error.message}`);
        socket.emit('error', 'Failed to send message');
      }
    });

    // Typing indicator
    socket.on('typing', (roomId) => {
      try {
        if (!currentUser) throw new Error('User not authenticated');
        const key = `${currentUser._id}-${roomId}`;
        if (!typingUsers.has(key)) {
          typingUsers.set(
            key,
            setTimeout(() => {
              typingUsers.delete(key);
              io.to(roomId).emit('typing-update', {
                user: currentUser._id,
                isTyping: false,
              });
            }, 2000),
          );
          io.to(roomId).emit('typing-update', {
            user: currentUser._id,
            isTyping: true,
          });
        }
      } catch (error) {
        console.error(`Typing failed: ${error.message}`);
      }
    });

    // Edit message
    socket.on('edit-message', async ({ messageId, content }) => {
      try {
        if (!currentUser) throw new Error('User not authenticated');
        const message = await Message.findById(messageId);
        if (!message) throw new Error('Message not found');
        if (message.sender.toString() !== currentUser._id.toString())
          throw new Error('Unauthorized');

        message.content = content;
        message.edited = true;
        await message.save();

        console.log(`Message edited: ${message._id}`);
        io.to(message.room).emit('message-updated', {
          _id: message._id,
          content: message.content,
          edited: true,
        });
      } catch (error) {
        console.error(`Edit message failed: ${error.message}`);
        socket.emit('error', 'Failed to edit message');
      }
    });

    // Delete message
    socket.on('delete-message', async (messageId) => {
      try {
        if (!currentUser) throw new Error('User not authenticated');
        const message = await Message.findById(messageId);
        if (!message) throw new Error('Message not found');
        if (message.sender.toString() !== currentUser._id.toString())
          throw new Error('Unauthorized');

        message.deleted = true;
        message.content = 'This message has been deleted';
        await message.save();

        console.log(`Message deleted: ${messageId}`);
        io.to(message.room).emit('message-deleted', messageId);
      } catch (error) {
        console.error(`Delete message failed: ${error.message}`);
        socket.emit('error', 'Failed to delete message');
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      if (currentUser) {
        console.log(`User disconnected: ${currentUser._id}`);
        connectedUsers.delete(currentUser._id.toString());
      } else {
        console.log(`Socket disconnected: ${socket.id}`);
      }
    });
  });
}
