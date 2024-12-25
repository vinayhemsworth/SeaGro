import React, { useState, useEffect, useRef } from 'react';
import { Send, Edit2, Trash2 } from 'lucide-react';
import { socket } from '../../services/socket';
import { useAuth } from '../../context/AuthContext';

export function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [editingMessage, setEditingMessage] = useState(null);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    socket.emit('join-room', roomId);

    socket.on('previous-messages', (msgs) => {
      setMessages(msgs.reverse());
      scrollToBottom();
    });

    socket.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    socket.on('typing-update', ({ user, isTyping }) => {
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        if (isTyping) {
          newSet.add(user);
        } else {
          newSet.delete(user);
        }
        return newSet;
      });
    });

    socket.on('message-updated', (updatedMessage) => {
      setMessages(prev => prev.map(msg => 
        msg._id === updatedMessage._id ? updatedMessage : msg
      ));
    });

    socket.on('message-deleted', (messageId) => {
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, deleted: true, content: 'This message has been deleted' } : msg
      ));
    });

    return () => {
      socket.off('previous-messages');
      socket.off('new-message');
      socket.off('typing-update');
      socket.off('message-updated');
      socket.off('message-deleted');
    };
  }, [roomId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    if (editingMessage) {
      socket.emit('edit-message', {
        messageId: editingMessage._id,
        content: newMessage
      });
      setEditingMessage(null);
    } else {
      socket.emit('send-message', {
        content: newMessage,
        roomId
      });
    }

    setNewMessage('');
  };

  const handleTyping = () => {
    socket.emit('typing', roomId);
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setNewMessage(message.content);
  };

  const handleDelete = (messageId) => {
    socket.emit('delete-message', messageId);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.sender._id === user._id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${message.sender._id === user._id ? 'bg-teal-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  {message.sender.username}
                </span>
                {message.sender._id === user._id && !message.deleted && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(message)}
                      className="p-1 hover:bg-black/10 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(message._id)}
                      className="p-1 hover:bg-black/10 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <p>{message.content}</p>
              {message.edited && (
                <span className="text-xs opacity-70">(edited)</span>
              )}
            </div>
          </div>
        ))}
        {typingUsers.size > 0 && (
          <div className="text-sm text-gray-500">
            {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSend();
              handleTyping();
            }}
            placeholder={editingMessage ? "Edit message..." : "Type a message..."}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}