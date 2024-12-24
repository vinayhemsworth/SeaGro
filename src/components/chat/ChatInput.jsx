import React from 'react';
import { Send } from 'lucide-react';

export function ChatInput({ input, setInput, onSend }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={onSend}
          className="p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}