import React from 'react';
import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';

export function Chat() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-8rem)]">
        <div className="lg:col-span-1">
          <ChatList />
        </div>
        <div className="lg:col-span-3">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}