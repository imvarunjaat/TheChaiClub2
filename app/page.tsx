'use client';

import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import Head from 'next/head';

interface ChatRoomCardProps {
  title: string;
  description: string;
  onlineCount: number;
  icon: ReactNode;
  gradient: string;
  textColor: string;
  buttonColor: string;
}

// Component for Chat Room Cards
function ChatRoomCard({ title, description, onlineCount, icon, gradient, textColor, buttonColor }: ChatRoomCardProps) {
  return (
    <div className={`flex flex-col bg-gradient-to-br ${gradient} rounded-2xl sm:rounded-3xl shadow-lg p-3 sm:p-5 md:p-7 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-[#faede4] group relative overflow-hidden mobile-card mobile-fade-in w-full`}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 -mr-6 -mt-6 bg-current"></div>
      <div className="flex items-center gap-1.5 sm:gap-4 mb-2 sm:mb-4">
        <span className={`${buttonColor} rounded-full p-1.5 sm:p-3 transition-transform duration-300 group-hover:scale-110 shadow-md`}>
          {icon}
        </span>
        <div>
          <h3 className={`text-sm sm:text-lg font-semibold ${textColor} group-hover:translate-x-1 transition-transform duration-300 truncate max-w-[150px] sm:max-w-full`}>{title}</h3>
          <span className="text-xs text-[#b89e8f] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 mobile-pulse"></span>
            {onlineCount} online
          </span>
        </div>
      </div>
      <p className="text-[#b89e8f] text-xs sm:text-sm mb-3 sm:mb-6 flex-grow leading-relaxed line-clamp-3 sm:line-clamp-none">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          <Image 
            src="https://randomuser.me/api/portraits/men/12.jpg"
            alt="User"
            width={24}
            height={24}
            className="rounded-full border-2 border-white"
          />
          <Image 
            src="https://randomuser.me/api/portraits/women/22.jpg"
            alt="User"
            width={24}
            height={24}
            className="rounded-full border-2 border-white"
          />
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#f9c7c7] border-2 border-white flex items-center justify-center">
            <span className="text-xs text-[#593A27] font-medium">+{onlineCount - 2}</span>
          </div>
        </div>
        <button className={`${buttonColor} text-[#593A27] px-2 sm:px-4 md:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] shadow-sm whitespace-nowrap mobile-btn`}>
          Join Room
        </button>
      </div>
    </div>
  );
}

interface ActiveUserProps {
  image: string;
  college: string;
  borderColor: string;
  bgColor: string;
}

// Component for Active Users
function ActiveUser({ image, college, borderColor, bgColor }: ActiveUserProps) {
  return (
    <div className="relative group">
      <Image 
        src={image}
        alt={college}
        width={32}
        height={32}
        className={`rounded-full border-2 ${borderColor} shadow transition transform hover:scale-110`}
      />
      <span className={`absolute left-1/2 transform -translate-x-1/2 top-10 opacity-0 group-hover:opacity-100 transition bg-white px-2 py-1 rounded-xl text-xs font-semibold ${bgColor} text-[#a07764] shadow-lg z-10 whitespace-nowrap`}>
        {college}
      </span>
    </div>
  );
}

interface ChaiCupProps {
  opacity: string | number;
}

// Component for Chai Cup
function ChaiCup({ opacity }: ChaiCupProps) {
  return (
    <div className={`chai-cup opacity-${opacity}`}>
      <div className="chai-steam"></div>
      <svg viewBox="0 0 32 24" fill="none" className="absolute bottom-0 left-0 w-full h-4"></svg>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    // Update viewport meta tag for better mobile responsiveness
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover';
    document.head.appendChild(meta);
    
    return () => {
      document.head.removeChild(meta);
    }
  }, []);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen max-w-[100vw] overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-full sm:w-16 md:w-20 bg-white/70 backdrop-blur-lg flex sm:flex-col items-center justify-between sm:justify-start sm:rounded-r-3xl py-2 sm:py-8 shadow-xl border-b sm:border-b-0 sm:border-r border-[#fbeee0] z-10 sticky top-0 sm:relative mobile-glass">
        <div className="sm:mb-12">
          <Image 
            src="https://i.imgur.com/5ksRGJ4.png" 
            alt="TheChaiClub Logo" 
            width={40} 
            height={40} 
            className="rounded-full shadow-md"
          />
        </div>
        <nav className="flex sm:flex-col space-x-4 sm:space-x-0 sm:space-y-8 items-center smooth-scroll">
          <button title="Home" className="focus:outline-none hover:scale-110 transition mobile-nav-item active touch-target flex flex-col items-center">
            <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M3 12L12 4l9 8"></path><path d="M9 21V12h6v9"></path></svg>
            <span className="text-xs font-medium mt-1 text-[#593A27] sm:block hidden">Home</span>
            <span className="text-[10px] font-medium mt-0.5 text-[#593A27] block sm:hidden">Home</span>
          </button>
          <button title="Chat Rooms" className="focus:outline-none hover:scale-110 transition mobile-nav-item touch-target flex flex-col items-center">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
              <ellipse cx="14" cy="18" rx="7" ry="5" fill="#fbeee0" stroke="#593A27" strokeWidth="1.5"/>
              <path d="M21 17c2 0 4 1 4 3s-2 3-4 3" stroke="#593A27" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M7 18c-2 0-3-2-2-3" stroke="#593A27" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <ellipse cx="14" cy="13" rx="4" ry="1.2" fill="#fbeee0" stroke="#593A27" strokeWidth="1.2"/>
              <path d="M24 19c.5 1.5 2 2 2 2" stroke="#593A27" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              <rect x="22.5" y="22" width="6" height="4" rx="2" fill="#fbeee0" stroke="#593A27" strokeWidth="1.2"/>
              <path d="M25 26v2l2-2" stroke="#593A27" strokeWidth="1.2" strokeLinecap="round"/>
              <rect x="16" y="25" width="5" height="3" rx="1.5" fill="#fbeee0" stroke="#593A27" strokeWidth="1.2"/>
              <path d="M18 28v1l1.5-1" stroke="#593A27" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="text-xs font-medium mt-1 text-[#593A27] sm:block hidden">Rooms</span>
            <span className="text-[10px] font-medium mt-0.5 text-[#593A27] block sm:hidden">Rooms</span>
          </button>
          <button title="My Chats" className="focus:outline-none hover:scale-110 transition mobile-nav-item touch-target flex flex-col items-center">
            <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z"></path></svg>
            <span className="text-xs font-medium mt-1 text-[#593A27] sm:block hidden">Chats</span>
            <span className="text-[10px] font-medium mt-0.5 text-[#593A27] block sm:hidden">Chats</span>
          </button>

        </nav>
        <div className="sm:mt-auto sm:pt-10 hidden sm:block">
          <span className="text-xs text-[#b89e8f]">v1.0</span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Top Navbar */}
        <header className="w-full flex flex-wrap justify-between items-center px-3 sm:px-6 md:px-8 py-2 sm:py-4 bg-white/70 backdrop-blur-lg shadow-sm sm:rounded-bl-3xl border-b border-[#fbeee0] sticky top-[50px] sm:top-0 z-[5] mobile-glass">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-[#593A27] flex items-center gap-1 sm:gap-2">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#f9c7c7]" fill="currentColor" viewBox="0 0 20 20"><path d="M4 5a2 2 0 012-2h8a2 2 0 012 2v7a2 2 0 01-2 2h-1v2.382a1 1 0 01-1.447.894l-2.106-1.053A1 1 0 018 16V14H6a2 2 0 01-2-2V5z"/></svg>
            TheChaiClub
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <Image 
              src="https://randomuser.me/api/portraits/women/79.jpg"
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full border-2 border-[#f9c7c7] shadow-md"
            />
          </div>
        </header>

        <main className="flex-1 grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 sm:gap-6 md:gap-8 p-2 sm:p-4 md:p-8 md:pt-8 smooth-scroll overflow-x-hidden">
          {/* Chat Rooms & Join Button */}
          <section className="xl:col-span-2 lg:col-span-2 md:col-span-2 flex flex-col">
            <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#6e4e36]">Featured Chat Rooms</h2>
              <button className="glow-btn bg-gradient-to-r from-[#f9c7c7] via-[#fbeee0] to-[#b89e8f] text-[#593A27] px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition transform hover:scale-105 focus:outline-none mobile-btn">
                + Join Room
              </button>
            </div>
            {/* Responsive Room Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 pb-8">
              {/* Chat Room Cards */}
              <ChatRoomCard 
                title="First Year Feels"
                description="Share your freshie confessions, college hacks & awkward stories."
                onlineCount={124}
                icon={<svg className="w-6 h-6 text-[#a07764]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/><circle cx="12" cy="11" r="8"/></svg>}
                gradient="from-[#fff5f2] to-[#f9c7c7]/40"
                textColor="text-[#a07764]"
                buttonColor="bg-[#f9c7c7] hover:bg-[#fbeee0]"
              />
              <ChatRoomCard 
                title="Breakup"
                description="Heartbreaks, healing, and moving on – talk it out with others who get it."
                onlineCount={67}
                icon={<svg className="w-6 h-6 text-[#e85a71]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 3C21 8 12 21 12 21S3 8 8 3c2.5-2.5 5.5-2.5 8 0z"/></svg>}
                gradient="from-[#fde5ec] to-[#faede4]"
                textColor="text-[#e85a71]"
                buttonColor="bg-[#fde5ec] hover:bg-[#f9c7c7]"
              />
              {/* Add more ChatRoomCard components for other rooms */}
              <ChatRoomCard 
                title="Hangout"
                description="Meet, chill, and vibe with new friends – virtual chai, anyone?"
                onlineCount={102}
                icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M17.5 17.5L22 22"/></svg>}
                gradient="from-[#fbeee0] via-[#e2f6ef] to-[#fff5f2]"
                textColor="text-[#35b8a6]"
                buttonColor="bg-[#e2f6ef] hover:bg-[#fbeee0]"
              />
              <ChatRoomCard 
                title="Gossips"
                description="Spill the tea, share campus news, or just enjoy some harmless gossip!"
                onlineCount={80}
                icon={<svg className="w-6 h-6 text-[#b89e8f]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="7"/><ellipse cx="12" cy="12" rx="6" ry="3"/></svg>}
                gradient="from-[#f9c7c7]/70 via-[#fffbe9] to-[#ffe8c7]"
                textColor="text-[#b89e8f]"
                buttonColor="bg-[#ffe066]/70 hover:bg-[#fffbe9]"
              />
              <ChatRoomCard 
                title="Exam Burnout Café"
                description="Vent, share memes or find a study buddy during exam szn."
                onlineCount={89}
                icon={<svg className="w-6 h-6 text-[#fff5f2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>}
                gradient="from-[#fbeee0] to-[#ede7fe]"
                textColor="text-[#a07764]"
                buttonColor="bg-[#ede7fe] hover:bg-[#fbeee0]"
              />
              <ChatRoomCard 
                title="Hostel Heartbreak Club"
                description="Love, situationships, friendships, breakups - no judgements here."
                onlineCount={56}
                icon={<svg className="w-6 h-6 text-[#e85a71]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 7 14.5 7 10a5 5 0 1110 0c0 4.5-5 11-5 11z"/></svg>}
                gradient="from-[#faede4] via-[#f9c7c7]/30 to-[#fff5f2]"
                textColor="text-[#e85a71]"
                buttonColor="bg-[#fbeee0] hover:bg-[#f9c7c7]"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
} 