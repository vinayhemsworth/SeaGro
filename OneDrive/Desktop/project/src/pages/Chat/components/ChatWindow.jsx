import React from 'react';
import { Send, Paperclip, Smile, MoreVertical } from 'lucide-react';

export function ChatWindow() {
  const messages = [
    {
      id: 1,
      sender: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      content: 'Hi! How are you doing?',
      time: '10:30 AM',
      isSelf: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Hey Sarah! I\'m doing great, thanks for asking. How about you?',
      time: '10:31 AM',
      isSelf: true
    },
    {
      id: 3,
      sender: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      content: 'I\'m good too! Just wanted to check about the project progress.',
      time: '10:32 AM',
      isSelf: false
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
            alt="Sarah Wilson"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Sarah Wilson</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[70%]`}>
              {!message.isSelf && (
                <img
                  src={message.avatar}
                  alt={message.sender}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div>
                <div
                  className={`p-3 rounded-2xl ${
                    message.isSelf
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{message.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Smile className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}