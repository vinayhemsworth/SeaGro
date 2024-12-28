import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, MoreVertical, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { format } from 'date-fns';
import { chatService } from '../../services/chat';
import { useAuth } from '../../context/AuthContext';

export function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const roomId = selectedUser ? [user._id, selectedUser._id].sort().join('-') : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!selectedUser || !user) return;

    if (!chatService.socket?.connected) {
      console.error('Socket is not connected');
      return;
    }

    chatService.joinRoom(roomId);

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    };

    const handleTypingUpdate = ({ user: typingUser, isTyping: typing }) => {
      if (typingUser === selectedUser._id) {
        setIsTyping(typing);
      }
    };

    chatService.onNewMessage(handleNewMessage);
    chatService.onTypingUpdate(handleTypingUpdate);

    return () => {
      chatService.socket?.off('new-message', handleNewMessage);
      chatService.socket?.off('typing-update', handleTypingUpdate);
    };
  }, [roomId, selectedUser, user]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    chatService.sendMessage(newMessage, roomId);
    setNewMessage('');
    setShowEmojiPicker(false);
  };

  const handleTyping = () => {
    chatService.emitTyping(roomId);
  };

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-4">
          <img
            src={selectedUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}`}
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{selectedUser.name}</h3>
            {isTyping && (
              <p className="text-sm text-gray-500">typing...</p>
            )}
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === user._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                message.sender === user._id
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs opacity-75 mt-1">
                {format(new Date(message.createdAt || Date.now()), 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t">
        <div className="relative flex items-center space-x-2">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Smile className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSend();
              handleTyping();
            }}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-2">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}