import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnectionAttempts: 5, // Retry up to 5 times
  reconnectionDelay: 2000, // Wait 2 seconds between retries
});

export const initializeSocket = (token) => {
  if (!token) {
    console.error('Token is required to initialize the socket.');
    return;
  }

  socket.auth = { token };
  socket.connect();

  socket.on('connect', () => {
    console.log(`Connected to socket server as ${socket.id}`);
    socket.emit('auth', token);
  });

  socket.on('disconnect', (reason) => {
    console.warn('Disconnected from socket server:', reason);
    if (reason === 'io server disconnect') {
      console.error('Disconnected by server. Attempting reconnection...');
      socket.connect(); // Reconnect manually if the server disconnected the client
    }
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log(`Reconnected to socket server after ${attemptNumber} attempts`);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
    console.log('Socket disconnected successfully.');
  } else {
    console.warn('Socket is not connected.');
  }
};
