import api from './api';
import { socket } from './socket';

export const chatService = {
  async getAllUsers() {
    const response = await api.get('/chat/users');
    return response.data;
  },

  sendMessage(content, roomId) {
    if (socket && socket.connected) {
      socket.emit('send-message', { content, roomId });
    } else {
      console.error('Cannot send message: Socket is not connected.');
    }
  },

  editMessage(messageId, content) {
    if (socket && socket.connected) {
      socket.emit('edit-message', { messageId, content });
    } else {
      console.error('Cannot edit message: Socket is not connected.');
    }
  },

  deleteMessage(messageId) {
    if (socket && socket.connected) {
      socket.emit('delete-message', messageId);
    } else {
      console.error('Cannot delete message: Socket is not connected.');
    }
  },

  joinRoom(roomId) {
    if (socket && socket.connected) {
      socket.emit('join-room', roomId);
    } else {
      console.error('Cannot join room: Socket is not connected.');
    }
  },

  onNewMessage(callback) {
    if (socket) {
      socket.on('new-message', callback);
    } else {
      console.error('Socket is undefined: Cannot set "new-message" listener.');
    }
  },

  onMessageUpdated(callback) {
    if (socket) {
      socket.on('message-updated', callback);
    } else {
      console.error('Socket is undefined: Cannot set "message-updated" listener.');
    }
  },

  onMessageDeleted(callback) {
    if (socket) {
      socket.on('message-deleted', callback);
    } else {
      console.error('Socket is undefined: Cannot set "message-deleted" listener.');
    }
  },

  onTypingUpdate(callback) {
    if (socket) {
      socket.on('typing-update', callback);
    } else {
      console.error('Socket is undefined: Cannot set "typing-update" listener.');
    }
  },

  emitTyping(roomId) {
    if (socket && socket.connected) {
      socket.emit('typing', roomId);
    } else {
      console.error('Cannot emit typing: Socket is not connected.');
    }
  }
};
