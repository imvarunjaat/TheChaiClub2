'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: Date;
}

interface ChatRoomPageProps {
  roomId: string;
  roomName: string;
  onBack: () => void;
}

export default function ChatRoomPage({ roomId, roomName, onBack }: ChatRoomPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<{id: string, name: string, avatar: string}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate fetching room data
    const mockUsers = [
      { id: '1', name: 'Aditya Singh', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: '2', name: 'Priya Sharma', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: '3', name: 'Rahul Verma', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
      { id: '4', name: 'Neha Gupta', avatar: 'https://randomuser.me/api/portraits/women/67.jpg' },
      { id: '5', name: 'Vikram Patel', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    ];
    
    const mockMessages = [
      {
        id: '1',
        sender: 'Aditya Singh',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Hey everyone! Welcome to the chat room!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        id: '2',
        sender: 'Priya Sharma',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'Thanks for creating this space! I\'ve been looking for a place to discuss this topic.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25) // 25 minutes ago
      },
      {
        id: '3',
        sender: 'Rahul Verma',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        content: 'Same here! Anyone from Delhi University?',
        timestamp: new Date(Date.now() - 1000 * 60 * 20) // 20 minutes ago
      },
      {
        id: '4',
        sender: 'Neha Gupta',
        avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        content: 'I am! Which college?',
        timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
      }
    ];
    
    setOnlineUsers(mockUsers);
    setMessages(mockMessages);
  }, [roomId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // Add new message to the chat
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'You', // In a real app, this would be the current user's name
      avatar: 'https://randomuser.me/api/portraits/men/74.jpg', // In a real app, this would be the current user's avatar
      content: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // In a real app, you would send this message to your backend/API
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-[#fff8f3] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#fbeee0] bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button 
            className="mr-4 hover:bg-[#fbeee0] p-2 rounded-full transition-all duration-300 transform hover:scale-110" 
            title="Back"
            onClick={onBack}
          >
            <svg className="w-5 h-5" fill="none" stroke="#593A27" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f9c7c7] to-[#fbeee0] flex items-center justify-center shadow-md">
                <span className="text-[#593A27] font-bold text-lg">{roomName.charAt(0)}</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-bold text-[#593A27]">{roomName}</h2>
              <p className="text-xs text-[#b89e8f] flex items-center">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                {onlineUsers.length} online
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[#fbeee0] rounded-full transition-all duration-300 transform hover:scale-110" title="Room info">
            <svg className="w-5 h-5" fill="none" stroke="#593A27" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-pattern">
          <div className="space-y-6 py-2">
            {/* Date separator */}
            <div className="flex justify-center">
              <div className="bg-[#f9c7c7]/30 text-[#593A27] text-xs px-4 py-1 rounded-full font-medium shadow-sm">
                Today
              </div>
            </div>
            
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} animate-fadeIn message-${index}`}
              >
                <div className={`flex max-w-[80%] ${message.sender === 'You' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex-shrink-0 self-end">
                    <div className="relative">
                      <Image 
                        src={message.avatar}
                        alt={message.sender}
                        width={36}
                        height={36}
                        className="rounded-full border-2 border-white shadow-sm"
                      />
                      {message.sender !== 'You' && (
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white"></span>
                      )}
                    </div>
                  </div>
                  <div className={`mx-2 ${message.sender === 'You' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center mb-1">
                      <span className={`text-xs text-[#b89e8f] ${message.sender === 'You' ? 'order-last ml-2' : 'order-first mr-2'}`}>
                        {formatTime(message.timestamp)}
                      </span>
                      <span className="text-sm font-medium text-[#593A27]">{message.sender}</span>
                    </div>
                    <div 
                      className={`rounded-2xl py-3 px-4 shadow-sm ${message.sender === 'You' 
                        ? 'bg-gradient-to-br from-[#f9c7c7]/80 to-[#fbeee0] text-[#593A27] rounded-tr-none' 
                        : 'bg-white text-[#593A27] rounded-tl-none'}`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            <div className="flex justify-start animate-fadeIn">
              <div className="flex max-w-[80%] flex-row">
                <div className="flex-shrink-0 self-end">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">?</span>
                    </div>
                  </div>
                </div>
                <div className="mx-2 items-start">
                  <div className="flex items-center mb-1">
                    <span className="text-xs text-[#b89e8f] order-first mr-2">
                      just now
                    </span>
                    <span className="text-sm font-medium text-[#593A27]">Someone</span>
                  </div>
                  <div className="rounded-2xl py-2 px-4 bg-white text-[#593A27] rounded-tl-none shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#b89e8f] rounded-full animate-bounce typing-dot-1"></div>
                      <div className="w-2 h-2 bg-[#b89e8f] rounded-full animate-bounce typing-dot-2"></div>
                      <div className="w-2 h-2 bg-[#b89e8f] rounded-full animate-bounce typing-dot-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      {/* Message Input */}
      <div className="border-t border-[#fbeee0] p-4 bg-white shadow-lg">
        <form onSubmit={handleSendMessage} className="flex items-center bg-[#f9f9f9] rounded-full px-3 shadow-inner">
          <button 
            type="button"
            className="p-2 text-[#b89e8f] hover:text-[#593A27] transition-all duration-300 transform hover:scale-110"
            title="Add attachment"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 py-3 px-3 bg-transparent rounded-full focus:outline-none text-[#593A27] placeholder-[#b89e8f]"
          />
          <button 
            type="button"
            className="p-2 text-[#b89e8f] hover:text-[#593A27] transition-all duration-300 transform hover:scale-110 mx-1"
            title="Add emoji"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </button>
          <button 
            type="submit"
            className={`p-2 rounded-full transition-all duration-300 transform ${newMessage.trim() ? 'bg-[#f9c7c7] hover:bg-[#fbeee0] hover:scale-110' : 'bg-[#f9c7c7]/50 cursor-not-allowed'}`}
            title="Send message"
            disabled={!newMessage.trim()}
          >
            <svg className="w-5 h-5 text-[#593A27]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
