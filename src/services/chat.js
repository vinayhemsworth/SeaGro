import { getSocket } from './socket';
import api from './api';

class ChatService {
  constructor() {
    this.socket = null; // You may want to store socket instance here
  }

  async initialize(token) {
    // Assuming token is used to authenticate the socket connection
    if (!this.socket) {
      this.socket = getSocket();

      if (!this.socket?.connected) {
        console.log('Connecting socket...');
        this.socket.connect(); // Assuming the socket needs to be connected explicitly

        // Optionally send token to server for authentication
        this.socket.on('connect', () => {
          this.socket.emit('authenticate', { token });
        });
      }
    }
  }

  async getAllUsers() {
    try {
      const response = await api.get('/chat/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  joinRoom(roomId) {
    if (!this.socket?.connected) {
      console.error('Cannot join room: Socket is not connected');
      return;
    }
    this.socket.emit('join-room', roomId);
  }

  sendMessage(content, roomId) {
    if (!this.socket?.connected) {
      console.error('Cannot send message: Socket is not connected');
      return;
    }
    this.socket.emit('send-message', { content, roomId });
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('new-message', callback);
    }
  }

  onTypingUpdate(callback) {
    if (this.socket) {
      this.socket.on('typing-update', callback);
    }
  }

  emitTyping(roomId) {
    if (!this.socket?.connected) {
      console.error('Cannot emit typing: Socket is not connected');
      return;
    }
    this.socket.emit('typing', roomId);
  }

  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
}

export const chatService = new ChatService();
