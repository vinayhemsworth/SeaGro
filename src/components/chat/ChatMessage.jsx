import React from 'react';

export function ChatMessage({ message }) {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.type === 'user'
            ? 'bg-teal-500 text-white'
            : 'bg-gray-100'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}