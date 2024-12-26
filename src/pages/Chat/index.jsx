import React, { useState } from 'react';
import { UserList } from '../../components/chat/UserList';
import { ChatWindow } from './components/ChatWindow';

export function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-8rem)]">
        <div className="lg:col-span-1">
          <UserList onUserSelect={handleUserSelect} />
        </div>
        <div className="lg:col-span-3">
          {selectedUser ? (
            <ChatWindow selectedUser={selectedUser} />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm h-full flex items-center justify-center">
              <p className="text-gray-500">Select a user to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}