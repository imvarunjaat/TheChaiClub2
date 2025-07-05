'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface CollegeRoomPageProps {
  onBack: () => void;
  college?: string;
}

// Mock data for college members and their messages
const collegeMembersData = [
  {
    id: '1',
    name: 'Aryan Sharma',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    college: 'IITB',
    year: '2nd Year',
    bio: 'CS Major. Coffee enthusiast. Always up for hackathons!'
  },
  {
    id: '2',
    name: 'Priya Patel',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    college: 'IITB',
    year: '3rd Year',
    bio: 'EE student. Loves photography and music production.'
  },
  {
    id: '3',
    name: 'Varun Mehta',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
    college: 'IITB',
    year: '1st Year',
    bio: 'Mechanical Engineering. Basketball player. Foodie.'
  },
  {
    id: '4',
    name: 'Neha Gupta',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    college: 'IITB',
    year: '2nd Year',
    bio: 'Physics major. Astronomy club president. Chai lover.'
  },
  {
    id: '5',
    name: 'Rahul Kumar',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    college: 'IITB',
    year: '4th Year',
    bio: 'Chemical Engineering. Enjoys playing guitar and coding.'
  },
  {
    id: '6',
    name: 'Ananya Singh',
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
    college: 'IITB',
    year: '3rd Year',
    bio: 'Architecture student. Passionate about sustainable design.'
  },
  {
    id: '7',
    name: 'Karan Joshi',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    college: 'IITB',
    year: '1st Year',
    bio: 'Biotech major. Research assistant. Loves swimming.'
  },
  {
    id: '8',
    name: 'Sneha Reddy',
    image: 'https://randomuser.me/api/portraits/women/30.jpg',
    college: 'IITB',
    year: '2nd Year',
    bio: 'Math enthusiast. Dance team member. Movie buff.'
  }
];

// Mock chat messages for the college room
const mockMessages = [
  {
    id: 'm1',
    sender: collegeMembersData[2], // Varun
    content: 'Hey fellow IITBians! Anyone working on any interesting projects?',
    timestamp: new Date(new Date().getTime() - 35 * 60000).toISOString()
  },
  {
    id: 'm2',
    sender: collegeMembersData[0], // Aryan
    content: 'I\'m building a recommendation system for campus events. Would love some help with the ML part!',
    timestamp: new Date(new Date().getTime() - 30 * 60000).toISOString()
  },
  {
    id: 'm3',
    sender: collegeMembersData[1], // Priya
    content: 'That sounds interesting! I\'ve been working on ML models in my research. Maybe we can collaborate?',
    timestamp: new Date(new Date().getTime() - 25 * 60000).toISOString()
  },
  {
    id: 'm4',
    sender: collegeMembersData[3], // Neha
    content: 'Also, don\'t forget about the astronomy club meeting tonight at 8! We\'re planning to observe the meteor shower 🌠',
    timestamp: new Date(new Date().getTime() - 20 * 60000).toISOString()
  },
  {
    id: 'm5',
    sender: collegeMembersData[0], // Aryan
    content: 'Thanks Priya! That would be great. And yes Neha, I\'ll be there for the astronomy club meeting!',
    timestamp: new Date(new Date().getTime() - 15 * 60000).toISOString()
  },
  {
    id: 'm6',
    sender: collegeMembersData[6], // Karan
    content: 'Has anyone registered for the upcoming hackathon? Looking for team members!',
    timestamp: new Date(new Date().getTime() - 10 * 60000).toISOString()
  },
  {
    id: 'm7',
    sender: collegeMembersData[4], // Rahul
    content: 'I\'m in for the hackathon. Been working on my guitar skills too if anyone wants to jam sometime 🎸',
    timestamp: new Date(new Date().getTime() - 5 * 60000).toISOString()
  },
  {
    id: 'm8',
    sender: collegeMembersData[5], // Ananya
    content: 'Just finished my sustainable architecture project. Would love feedback from anyone interested in green design!',
    timestamp: new Date(new Date().getTime() - 2 * 60000).toISOString()
  }
];

interface Message {
  id: string;
  sender: typeof collegeMembersData[0];
  content: string;
  timestamp: string;
}

// Chat Message Component
function ChatMessage({ message, isMine }: { message: Message, isMine: boolean }) {
  const [formattedTime, setFormattedTime] = useState<string>('');
  
  // Format the timestamp on client-side only to avoid hydration mismatch
  useEffect(() => {
    setFormattedTime(new Date(message.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
  }, [message.timestamp]);
  
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isMine && (
        <div className="flex-shrink-0 mr-2">
          <div className="relative">
            <Image
              src={message.sender.image}
              alt={message.sender.name}
              width={36}
              height={36}
              className="rounded-full border border-[#fbeee0]"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"></div>
          </div>
        </div>
      )}
      <div className={`max-w-[75%]`}>
        {!isMine && <p className="text-xs text-[#b89e8f] mb-1">{message.sender.name} • {message.sender.year}</p>}
        <div className={`rounded-2xl py-2 px-4 ${isMine 
          ? 'bg-[#f9c7c7] text-[#593A27]'
          : 'bg-[#fbeee0]/70 text-[#593A27]'}`}>
          <p className="text-sm">{message.content}</p>
        </div>
        <p className="text-xs text-[#b89e8f] mt-1 text-right">
          {formattedTime}
        </p>
      </div>
      {isMine && (
        <div className="flex-shrink-0 ml-2">
          <Image
            src="https://randomuser.me/api/portraits/men/41.jpg" // Current user avatar
            alt="You"
            width={36}
            height={36}
            className="rounded-full border border-[#fbeee0]"
          />
        </div>
      )}
    </div>
  );
}

export default function CollegeRoomPage({ onBack, college = 'IITB' }: CollegeRoomPageProps) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserID = 'current-user'; // In a real app, this would come from authentication

  const emojis = ['😊', '😂', '❤️', '👍', '🙏', '🎉', '😎', '🔥', '✨', '🤔'];

  // Scroll to the bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: `m${new Date().getTime()}`,
      // In a real app, the sender would be the current user
      sender: collegeMembersData[6], // Using Karan's profile for demo purposes
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage(newMessage + emoji);
    setShowEmojiPicker(false);
  };

  // Active college members in this room
  const activeMembers = collegeMembersData.slice(0, 5);

  return (
    <div className="flex flex-col h-full bg-[#fefefe]">
      {/* Chat Room Header */}
      <div className="flex items-center justify-between p-3 border-b border-[#fbeee0] bg-white shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-3 hover:bg-[#fbeee0] p-1 rounded-full transition-colors"
            title="Back"
          >
            <svg className="w-6 h-6" fill="none" stroke="#593A27" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#593A27] to-[#8B5E34] flex items-center justify-center mr-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#593A27] flex items-center gap-1">
                {college} Community
                <span className="text-xs font-medium py-0.5 px-2 rounded-full bg-[#fbeee0] text-[#593A27] ml-2">College</span>
              </h2>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                <p className="text-xs text-[#b89e8f]">{activeMembers.length} peers online</p>
              </div>
            </div>
          </div>
        </div>
        <button 
          className="p-2 rounded-full hover:bg-[#fbeee0] transition-colors"
          title="Room options"
          aria-label="Room options"
        >
          <svg className="w-5 h-5 text-[#593A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Active Members Horizontal Scroll */}
      <div className="flex items-center p-2 bg-[#fbeee0]/30 overflow-x-auto">
        <span className="text-xs font-medium text-[#593A27] mr-2 whitespace-nowrap">Active Now:</span>
        <div className="flex space-x-1">
          {activeMembers.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center mr-2">
              <div className="relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={28}
                  height={28}
                  className="rounded-full border border-[#f9c7c7]"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white"></div>
              </div>
              <span className="text-[10px] text-[#593A27] mt-0.5 whitespace-nowrap">{member.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {/* Welcome Message */}
        <div className="text-center mb-6">
          <div className="inline-block bg-[#fbeee0]/50 rounded-lg px-4 py-2">
            <p className="text-sm text-[#593A27]">Welcome to the {college} Community Room!</p>
            <p className="text-xs text-[#b89e8f] mt-1">Chat with peers from your college</p>
          </div>
        </div>
        
        {/* Messages */}
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isMine={message.sender.id === collegeMembersData[6].id} // For demo, we're using Karan as the current user
          />
        ))}
        <div ref={messagesEndRef} /> {/* Empty div for auto-scroll */}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-[#fbeee0] bg-white">
        <div className="relative flex items-center bg-[#fbeee0]/30 rounded-xl p-1">
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-full hover:bg-[#fbeee0] transition-colors"
            title="Insert emoji"
            aria-label="Insert emoji"
          >
            <svg className="w-6 h-6 text-[#593A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 bg-white rounded-xl shadow-lg p-2 border border-[#fbeee0] grid grid-cols-5 gap-1 w-[200px]">
              {emojis.map((emoji, index) => (
                <button 
                  key={index} 
                  className="hover:bg-[#fbeee0] rounded p-1.5 text-xl transition-colors"
                  onClick={() => handleEmojiClick(emoji)}
                  title={`Insert ${emoji} emoji`}
                  aria-label={`Insert ${emoji} emoji`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-transparent focus:outline-none text-[#593A27]"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 rounded-full hover:bg-[#f9c7c7] transition-colors disabled:opacity-50"
            title="Send message"
            aria-label="Send message"
          >
            <svg className="w-6 h-6 text-[#593A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
