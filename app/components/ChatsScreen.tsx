'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ChatItemProps {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  isRequest?: boolean;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

const ChatItem = ({ id, name, lastMessage, time, avatar, isRequest, onAccept, onReject }: ChatItemProps) => {
  return (
    <div className="flex items-center p-3 hover:bg-[#fbeee0]/50 rounded-xl transition-all duration-150 cursor-pointer active:bg-[#fbeee0]/70 hover:shadow-md relative overflow-hidden group">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-pink-200 animate-pulse opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <Image 
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover border-2 border-[#fbeee0] group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
      </div>
      <div className="flex-grow min-w-0 ml-3">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-[#593A27] truncate">{name}</h4>
          <span className="text-xs text-[#b89e8f] ml-2 whitespace-nowrap">{time}</span>
        </div>
        <p className="text-sm text-[#6e4e36] truncate">{lastMessage}</p>
        {isRequest && (
          <div className="flex mt-2 space-x-2">
            <button 
              onClick={() => onAccept && onAccept(id)}
              className="px-3 py-1 bg-[#f9c7c7] text-[#593A27] rounded-full text-xs font-medium hover:bg-[#f9c7c7]/80"
            >
              Accept
            </button>
            <button 
              onClick={() => onReject && onReject(id)}
              className="px-3 py-1 bg-[#fbeee0] text-[#593A27] rounded-full text-xs font-medium hover:bg-[#fbeee0]/80"
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ChatsScreen() {
  const [activeTab, setActiveTab] = useState<'messages' | 'requests'>('messages');
  
  // Demo data for friends/approved contacts
  const [chats, setChats] = useState<Array<{
    id?: string;
    name: string;
    lastMessage: string;
    time: string;
    avatar: string;
  }>>([
    {
      name: "First Year Feels",
      lastMessage: "Reacted 👍 to your message",
      time: "1h",
      avatar: "https://randomuser.me/api/portraits/women/34.jpg"
    },
    {
      name: "Breakup Support",
      lastMessage: "Sent a reel",
      time: "2h",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Hangout",
      lastMessage: "Seen 1h ago",
      time: "1h",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
      name: "Gossips",
      lastMessage: "Sent a reel by meme.ideologies",
      time: "3h",
      avatar: "https://randomuser.me/api/portraits/women/64.jpg"
    },
    {
      name: "Exam Burnout Café",
      lastMessage: "Sent 3h ago",
      time: "3h",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Hostel Heartbreak Club",
      lastMessage: "Seen by om rohilla + 3",
      time: "",
      avatar: "https://randomuser.me/api/portraits/men/74.jpg"
    },
    {
      name: "ogadda",
      lastMessage: "Sent 7h ago",
      time: "7h",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg"
    }
  ]);
  
  // Demo data for chat requests
  const [requests, setRequests] = useState([
    {
      id: "req1",
      name: "Meera Kapoor",
      lastMessage: "Hi, I saw your post in the college group!",
      time: "2h",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      id: "req2",
      name: "Dev Patel",
      lastMessage: "Hey, I'm a friend of Rahul. Can we chat?",
      time: "5h",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg"
    }
  ]);

  const handleAcceptRequest = (id: string) => {
    // Find the request
    const request = requests.find(req => req.id === id);
    if (!request) return;
    
    // Add to approved chats
    setChats([...chats, request]);
    
    // Remove from requests
    setRequests(requests.filter(req => req.id !== id));
  };

  const handleRejectRequest = (id: string) => {
    // Remove from requests
    setRequests(requests.filter(req => req.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#fbeee0] bg-gradient-to-r from-[#fbeee0] via-white to-[#fbeee0]/30 shadow-sm">
        <div className="flex items-center">
          <button className="mr-4 md:hidden hover:bg-[#fbeee0] p-1 rounded-full transition-colors" title="Back">
            <svg className="w-6 h-6" fill="none" stroke="#593A27" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-[#593A27] flex items-center">
            <span className="bg-[#ff69b4] text-white rounded-lg px-2 py-1 mr-2 text-sm">ogadda</span> Chats
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[#fbeee0] rounded-full transition-colors" title="Search chats">
            <svg className="w-5 h-5" fill="none" stroke="#593A27" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[#fbeee0] rounded-full transition-colors" title="New message">
            <svg className="w-5 h-5" fill="none" stroke="#593A27" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-[#fbeee0] px-4 bg-white shadow-sm">
        <button 
          className={`flex-1 py-3 text-center relative ${activeTab === 'messages' ? 'text-[#593A27] font-medium' : 'text-[#b89e8f] hover:text-[#6e4e36]'} transition-colors`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
          {activeTab === 'messages' && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#593A27] rounded-full"></div>}
        </button>
        <button 
          className={`flex-1 py-3 text-center relative ${activeTab === 'requests' ? 'text-[#593A27] font-medium' : 'text-[#b89e8f] hover:text-[#6e4e36]'} transition-colors`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
          {activeTab === 'requests' && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#593A27] rounded-full"></div>}
        </button>
      </div>
      
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-[#fbeee0]/20">
        {activeTab === 'messages' ? (
          <div className="py-4 px-3 space-y-1">
            {chats.map((chat) => (
              <ChatItem 
                key={chat.id || chat.name} 
                id={chat.id || chat.name}
                name={chat.name} 
                lastMessage={chat.lastMessage} 
                time={chat.time} 
                avatar={chat.avatar} 
              />
            ))}
          </div>
        ) : (
          <div className="py-2 px-3">
            {requests.length > 0 ? (
              requests.map((request) => (
                <ChatItem 
                  key={request.id} 
                  id={request.id}
                  name={request.name} 
                  lastMessage={request.lastMessage} 
                  time={request.time} 
                  avatar={request.avatar} 
                  isRequest={true}
                  onAccept={handleAcceptRequest}
                  onReject={handleRejectRequest}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                <div className="w-16 h-16 bg-[#fbeee0] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#593A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[#593A27] mb-1">No Requests</h3>
                <p className="text-sm text-[#b89e8f] max-w-xs">When someone wants to message you, their request will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
