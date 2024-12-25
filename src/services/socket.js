import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: false
});

export const initializeSocket = (token) => {
  socket.auth = { token };
  socket.connect();

  socket.on('connect', () => {
    console.log('Connected to socket server');
    socket.emit('auth', token);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};