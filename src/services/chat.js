import api from './api';
import { getSocket, initializeSocket } from './socket';

export const chatService = {
  socket: null,

  initialize(token) {
    this.socket = initializeSocket(token);
    return this.socket;
  },

  async getAllUsers() {
    const response = await api.get('/chat/users');
    return response.data;
  },

  sendMessage(content, roomId) {
    const socket = getSocket();
    if (!socket) {
      throw new Error('Socket not initialized');
    }
    socket.emit('send-message', { content, roomId });
  },

  joinRoom(roomId) {
    const socket = getSocket();
    if (!socket) {
      throw new Error('Socket not initialized');
    }
    socket.emit('join-room', roomId);
  },

  onNewMessage(callback) {
    const socket = getSocket();
    if (socket) {
      socket.on('new-message', callback);
    }
  },

  onMessageUpdated(callback) {
    const socket = getSocket();
    if (socket) {
      socket.on('message-updated', callback);
    }
  },

  onMessageDeleted(callback) {
    const socket = getSocket();
    if (socket) {
      socket.on('message-deleted', callback);
    }
  },

  onTypingUpdate(callback) {
    const socket = getSocket();
    if (socket) {
      socket.on('typing-update', callback);
    }
  },

  emitTyping(roomId) {
    const socket = getSocket();
    if (!socket) {
      throw new Error('Socket not initialized');
    }
    socket.emit('typing', roomId);
  }
};