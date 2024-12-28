import React, { useState } from 'react';
import { UserList } from '../../components/chat/UserList';
import { ChatWindow } from '../../components/chat/ChatWindow';

export function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-8rem)]">
        <div className="lg:col-span-1">
          <UserList 
            onUserSelect={setSelectedUser} 
            selectedUserId={selectedUser?._id}
          />
        </div>
        <div className="lg:col-span-3">
          <ChatWindow selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
}