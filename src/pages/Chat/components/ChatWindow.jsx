import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, MoreVertical } from 'lucide-react';
import { chatService } from '../../../services/chat';
import { useAuth } from '../../../context/AuthContext';

export function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const roomId = [user._id, selectedUser._id].sort().join('-');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!selectedUser || !user) {
      console.error('Selected user or authenticated user is undefined.');
      return;
    }

    chatService.joinRoom(roomId);

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    };

    const handleMessageUpdate = (updatedMessage) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );
    };

    const handleMessageDelete = (messageId) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId
            ? { ...msg, deleted: true, content: 'This message has been deleted' }
            : msg
        )
      );
    };

    const handleTypingUpdate = ({ user: typingUser, isTyping: typing }) => {
      if (typingUser === selectedUser._id) {
        setIsTyping(typing);
      }
    };

    chatService.onNewMessage(handleNewMessage);
    chatService.onMessageUpdated(handleMessageUpdate);
    chatService.onMessageDeleted(handleMessageDelete);
    chatService.onTypingUpdate(handleTypingUpdate);

    return () => {
      if (chatService.socket && chatService.socket.connected) {
        chatService.socket.off('new-message');
        chatService.socket.off('message-updated');
        chatService.socket.off('message-deleted');
        chatService.socket.off('typing-update');
      } else {
        console.warn('Socket was not connected during cleanup.');
      }
    };
  }, [roomId, selectedUser, user]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    chatService.sendMessage(newMessage, roomId);
    setNewMessage('');
  };

  const handleTyping = () => {
    chatService.emitTyping(roomId);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={
              selectedUser.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                selectedUser.name
              )}&background=random`
            }
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedUser.name}
            </h2>
            {isTyping && <p className="text-sm text-gray-500">typing...</p>}
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === user._id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] ${
                message.sender === user._id
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100'
              } rounded-lg p-3`}
            >
              <p>{message.content}</p>
              {message.edited && (
                <span className="text-xs opacity-70">(edited)</span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onInput={handleTyping}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
