import React, { useState, useRef, useEffect } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import { geminiService } from '../../services/gemini';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { type: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await geminiService.generateResponse([...messages, userMessage]);
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      setError(error.message);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: error.message
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition-colors"
      >
        Chat with us
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl transition-all ${isMinimized ? 'h-14' : 'h-96'}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">AI Chat Support</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="h-72 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput 
            input={input}
            setInput={setInput}
            onSend={handleSend}
          />
        </>
      )}
    </div>
  );
}