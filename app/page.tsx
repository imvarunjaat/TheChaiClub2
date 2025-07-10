'use client';

import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';
import AuthModal from './components/AuthModal';
import RoomsScreen from './components/RoomsScreen';
import ChatsScreen from './components/ChatsScreen';
import ParticlesBackground from './components/ParticlesBackground';
import ChatRoomPage from './components/ChatRoomPage';
import CollegeRoomPage from './components/CollegeRoomPage';
import ProfilePage from './components/ProfilePage';
import { useAuth } from './context/AuthContext';
import { useChatRooms } from './hooks/useChatRooms';

interface ChatRoomCardProps {
  title: string;
  description: string;
  onlineCount: number;
  icon: ReactNode;
  gradient: string;
  textColor: string;
  buttonColor: string;
  onJoinRoom: (roomId: string, roomName: string, event?: React.MouseEvent) => void;
}

// Chat Room Card Component
function ChatRoomCard({ 
  title, 
  description, 
  onlineCount, 
  icon, 
  gradient, 
  textColor, 
  buttonColor,
  onJoinRoom
}: ChatRoomCardProps) {
  // Extract room ID from title (simplified approach)
  const roomId = title.toLowerCase().replace(/\s+/g, '-');
  
  // Create a CSS class name based on the room title
  const getRoomClassName = (title: string) => {
    const slugified = title.toLowerCase().replace(/\s+/g, '-');
    return `room-${slugified}`;
  };
  
  return (
    <div 
      className={`flex flex-col rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl chat-room-card ${getRoomClassName(title)}`}
      style={{ background: gradient }}
    >
      <div className="p-3 sm:p-5 md:p-7 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
            {icon ? (
              <div className="room-icon">{icon}</div>
            ) : (
              <div className="room-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
            )}</div>
          <div>
            <h3 className="font-semibold text-lg" style={{ color: textColor || '#593A27' }}>{title}</h3>
            <p className="text-xs opacity-80" style={{ color: textColor || '#593A27' }}>
              {onlineCount} online now
            </p>
          </div>
        </div>
        
        <p className="text-sm mb-4 flex-grow opacity-90" style={{ color: textColor || '#593A27' }}>
          {description}
        </p>
        
        <div className="flex justify-end mt-auto">
          <button
            onClick={(e) => onJoinRoom(roomId, title, e)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: buttonColor || '#f9c7c7',
              color: textColor || '#593A27'
            }}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

// Navigation Button Component
function NavButton({ 
  active, 
  onClick, 
  icon, 
  label 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: ReactNode; 
  label: string 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
        active ? 'bg-[#f9c7c7]/30' : 'hover:bg-[#fbeee0]/50'
      }`}
    >
      {icon}
      <span className={`text-xs font-medium mt-1 text-[#593A27] sm:block hidden ${
        active ? 'text-[#f9c7c7]' : ''
      }`}>
        {label}
      </span>
      <span className={`text-[10px] font-medium mt-0.5 text-[#593A27] block sm:hidden ${
        active ? 'text-[#f9c7c7]' : ''
      }`}>
        {label}
      </span>
    </button>
  );
}

export default function Home() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'rooms' | 'chats' | 'chatroom' | 'college'>('home');
  const [activeChatRoom, setActiveChatRoom] = useState<{id: string, name: string} | null>(null);
  
  // Get authentication state
  const { user, isNewUser, setIsNewUser, refreshProfile } = useAuth();
  
  // Room transition state
  const [isRoomTransitioning, setIsRoomTransitioning] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  
  // Get chat rooms from Supabase
  const { chatRooms, loading: loadingRooms } = useChatRooms();
  
  // Handle navigation between views
  const handleNavigation = (view: 'home' | 'rooms' | 'chats' | 'college') => {
    setActiveView(view);
  };
  
  // Handle joining a chat room
  const handleJoinRoom = (roomId: string, roomName: string, event?: React.MouseEvent) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setIsRoomTransitioning(true);
    setSelectedRoomId(roomId);
    
    // Find the room data
    const roomData = chatRooms.find(room => room.id === roomId);
    
    // Animate transition and navigate to chat room
    setTimeout(() => {
      setActiveChatRoom({ id: roomId, name: roomName });
      setActiveView('chatroom');
      setTimeout(() => {
        setIsRoomTransitioning(false);
        setSelectedRoomId(null);
      }, 300);
    }, 800); // Reduced from 2500ms to 800ms
  };
  
  // Handle back navigation from chat room
  const handleBackFromChatRoom = () => {
    setActiveView('home');
    setActiveChatRoom(null);
  };
  
  // Handle profile completion
  const handleProfileComplete = () => {
    setShowProfilePage(false);
    refreshProfile();
    setIsNewUser(false);
  };
  
  // Check if user is new and show profile page
  useEffect(() => {
    if (user && isNewUser) {
      setShowProfilePage(true);
    } else {
      setShowProfilePage(false);
    }
  }, [user, isNewUser]);
  
  // Fix for iOS Safari 100vh issue
  useEffect(() => {
    // Add meta viewport tag to fix iOS Safari 100vh issue
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover';
    document.head.appendChild(meta);
    
    return () => {
      document.head.removeChild(meta);
    }
  }, []);

  return (
    <div className="app-container">
      <ParticlesBackground />
      {showProfilePage && user ? (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#fbeee0]/30">
          <ProfilePage onComplete={handleProfileComplete} isNewUser={true} />
        </div>
      ) : (
        <div className="relative z-0">
          <div className="flex flex-col sm:flex-row min-h-screen max-w-[100vw] overflow-x-hidden">
            {/* Sidebar */}
            <aside className="w-full sm:w-16 md:w-20 bg-white/70 backdrop-blur-lg flex sm:flex-col items-center justify-between sm:justify-start sm:rounded-r-3xl py-2 sm:py-8 shadow-xl border-b sm:border-b-0 sm:border-r border-[#fbeee0] z-10 sticky top-0 sm:relative mobile-glass">
              <nav className="flex sm:flex-col items-center justify-center gap-1 sm:gap-4">
                <NavButton
                  active={activeView === 'home'}
                  onClick={() => handleNavigation('home')}
                  icon={
                    <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  }
                  label="Home"
                />
                
                <NavButton
                  active={activeView === 'rooms'}
                  onClick={() => handleNavigation('rooms')}
                  icon={
                    <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                  label="Rooms"
                />
                
                <NavButton
                  active={activeView === 'chats'}
                  onClick={() => handleNavigation('chats')}
                  icon={
                    <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                  label="Chats"
                />
                
                <NavButton
                  active={activeView === 'college'}
                  onClick={() => handleNavigation('college')}
                  icon={
                    <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  }
                  label="Yours"
                />
              </nav>
              <div className="sm:mt-auto sm:pt-10 hidden sm:block">
                <span className="text-xs text-[#b89e8f]">v1.0</span>
              </div>
            </aside>

            {/* Main Content Area with Sliding Views */}
            <div className="flex-1 flex flex-col w-full relative overflow-hidden">  
              {/* Chats Screen (Sliding Panel) */}
              <div className={`absolute top-0 left-0 right-0 bottom-0 bg-white transform transition-transform duration-300 ease-in-out z-20 ${activeView === 'chats' ? 'translate-x-0' : 'translate-x-full'}`}>
                <ChatsScreen />
              </div>
              {/* Rooms Screen (Sliding Panel) */}
              <div className={`absolute top-0 left-0 right-0 bottom-0 bg-white transform transition-transform duration-300 ease-in-out z-20 ${activeView === 'rooms' ? 'translate-x-0' : 'translate-x-full'}`}>
                <RoomsScreen onJoinRoom={handleJoinRoom} />
              </div>
              {/* College Room Screen (Sliding Panel) */}
              <div className={`fixed top-0 left-0 right-0 bottom-0 bg-white transform transition-transform duration-300 ease-in-out z-40 ${activeView === 'college' ? 'translate-x-0' : 'translate-x-full'}`}>
                <CollegeRoomPage onBack={() => handleNavigation('home')} />
              </div>
              {/* Chat Room Screen (Sliding Panel) */}
              <div className={`fixed top-0 left-0 right-0 bottom-0 bg-white transform transition-transform duration-300 ease-in-out z-40 ${activeView === 'chatroom' ? 'translate-x-0' : 'translate-x-full'}`}>
                {activeChatRoom && (
                  <ChatRoomPage 
                    roomId={activeChatRoom.id} 
                    roomName={activeChatRoom.name} 
                    onBack={handleBackFromChatRoom} 
                  />
                )}
              </div>
              {/* Top Navbar */}
              <header className="w-full flex flex-wrap justify-between items-center px-3 sm:px-6 md:px-8 py-2 sm:py-4 bg-white/70 backdrop-blur-lg shadow-sm sm:rounded-bl-3xl border-b border-[#fbeee0] sticky top-[50px] sm:top-0 z-[5] mobile-glass">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-[#593A27] flex items-center gap-1 sm:gap-2">
                  <div className="logo-container py-2 px-4">
                    <span className="logo-text text-5xl md:text-6xl">ogadda</span>
                  </div>
                </h1>
                <div className="flex items-center gap-2 sm:gap-4">
                  <button 
                    onClick={() => setAuthModalOpen(true)}
                    className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:scale-105 transition-transform group"
                    aria-label="Login or sign up"
                  >
                    <div className="relative w-9 h-9 rounded-full bg-[#fbeee0] flex items-center justify-center border-2 border-[#f9c7c7] shadow-md overflow-hidden">
                      <svg className="w-5 h-5 text-[#593A27] group-hover:text-[#f9c7c7] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0c0 4.5-5 11-5 11z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-[#593A27] hidden sm:block group-hover:text-[#f9c7c7] transition-colors">Sign In</span>
                  </button>
                </div>
              </header>

              <main className={`flex-1 w-full p-2 sm:p-4 md:p-6 lg:p-8 smooth-scroll overflow-x-hidden transition-opacity duration-300 ${activeView === 'home' ? 'opacity-100' : 'opacity-0'}`}>
                {/* Chat Rooms & Join Button */}
                <section className="w-full flex flex-col">
                  <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#6e4e36]">Featured Chat Rooms</h2>
                  </div>
                  {/* Transition overlay for room selection */}
                  {isRoomTransitioning && (
                    <div className="room-transition-overlay"></div>
                  )}
                  
                  {/* Responsive Room Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full pb-8 relative">
                    {loadingRooms ? (
                      // Loading skeleton
                      Array(6).fill(0).map((_, i) => (
                        <div key={i} className="flex flex-col bg-white/50 animate-pulse rounded-2xl sm:rounded-3xl shadow-lg p-3 sm:p-5 md:p-7 h-52">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                            <div className="space-y-2">
                              <div className="h-4 w-24 bg-gray-200 rounded"></div>
                              <div className="h-3 w-16 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                          <div className="space-y-2 flex-grow">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Render chat rooms from Supabase
                      chatRooms.map((room) => (
                        <div 
                          key={room.id} 
                          className={`${selectedRoomId === room.id ? 'room-selected' : ''} ${selectedRoomId && selectedRoomId !== room.id ? 'smoke-disappear' : ''}`}
                        >
                          <ChatRoomCard 
                            title={room.name}
                            description={room.description}
                            onlineCount={room.online_count || 0}
                            // Parse SVG from string to React element
                            icon={<div dangerouslySetInnerHTML={{ __html: room.icon }} />}
                            gradient={room.gradient}
                            textColor={room.text_color}
                            buttonColor={room.button_color}
                            onJoinRoom={handleJoinRoom}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </main>
            </div>
            
            {/* Auth Modal */}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
