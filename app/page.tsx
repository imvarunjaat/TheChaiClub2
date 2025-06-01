'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 md:w-20 bg-white/70 backdrop-blur-lg flex flex-col items-center rounded-r-3xl pt-8 pb-8 shadow-xl border-r border-[#fbeee0]">
        <div className="mb-12">
          <Image 
            src="https://i.imgur.com/5ksRGJ4.png" 
            alt="TheChaiClub Logo" 
            width={40} 
            height={40} 
            className="rounded-full shadow-md"
          />
        </div>
        <nav className="flex flex-col space-y-8 items-center">
          <button title="Home" className="focus:outline-none hover:scale-110 transition">
            <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M3 12L12 4l9 8"></path><path d="M9 21V12h6v9"></path></svg>
          </button>
          <button title="Chat Rooms" className="focus:outline-none hover:scale-110 transition">
            <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M8 12h8"></path></svg>
          </button>
          <button title="My Chats" className="focus:outline-none hover:scale-110 transition">
            <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z"></path></svg>
          </button>
          <button title="Streaks" className="focus:outline-none hover:scale-110 transition">
            <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M12 3v10"></path><path d="M17 8a5 5 0 11-10 0"></path></svg>
          </button>
          <button title="Profile" className="focus:outline-none hover:scale-110 transition">
            <svg className="w-7 h-7" fill="none" stroke="#593A27" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M16 16a4 4 0 00-8 0"></path></svg>
          </button>
        </nav>
        <div className="mt-auto pt-10">
          <span className="text-xs text-[#b89e8f]">v1.0</span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="w-full flex flex-wrap justify-between items-center px-4 sm:px-8 py-4 bg-white/70 backdrop-blur-lg shadow-sm rounded-bl-3xl border-b border-[#fbeee0]">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#593A27] flex items-center gap-2">
            <svg className="w-7 h-7 text-[#f9c7c7]" fill="currentColor" viewBox="0 0 20 20"><path d="M4 5a2 2 0 012-2h8a2 2 0 012 2v7a2 2 0 01-2 2h-1v2.382a1 1 0 01-1.447.894l-2.106-1.053A1 1 0 018 16V14H6a2 2 0 01-2-2V5z"/></svg>
            TheChaiClub
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4 mt-3 sm:mt-0">
            <span className="text-base font-medium text-[#a07764]">Mood:</span>
            <select 
              className="bg-[#faede4] text-[#593A27] rounded-xl px-3 py-1 border-none focus:ring-2 focus:ring-[#f9c7c7] font-semibold shadow-sm"
              aria-label="Select your mood"
            >
              <option>None</option>
              <option>Happy</option>
              <option>Sad</option>
              <option>Lonely</option>
              <option>Curious</option>
            </select>
            <Image 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Profile" 
              width={32} 
              height={32} 
              className="rounded-full shadow-md border-2 border-[#f9c7c7]"
            />
          </div>
        </header>

        <main className="flex-1 grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 p-4 sm:p-8 pt-6">
          {/* Chat Rooms & Join Button */}
          <section className="xl:col-span-2 lg:col-span-2 md:col-span-2 flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-xl md:text-2xl font-semibold text-[#6e4e36]">Featured Chat Rooms</h2>
              <button className="glow-btn bg-gradient-to-r from-[#f9c7c7] via-[#fbeee0] to-[#b89e8f] text-[#593A27] px-5 py-2 rounded-2xl font-bold shadow-lg transition transform hover:scale-105 focus:outline-none">
                + Join Room
              </button>
            </div>
            {/* Responsive Room Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
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

          {/* Sidebar Widgets */}
          <aside className="flex flex-col space-y-6">
            {/* Active Users */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md p-5 border border-[#faede4]">
              <h4 className="font-semibold text-[#a07764] text-base mb-3">Active Users Online</h4>
              <div className="flex flex-wrap -space-x-2 mb-2">
                <ActiveUser 
                  image="https://randomuser.me/api/portraits/men/12.jpg"
                  college="IIT-B"
                  borderColor="border-[#f9c7c7]"
                  bgColor="bg-[#faede4]"
                />
                <ActiveUser 
                  image="https://randomuser.me/api/portraits/women/22.jpg"
                  college="DU"
                  borderColor="border-[#b89e8f]"
                  bgColor="bg-[#fff5f2]"
                />
                {/* Add more ActiveUser components */}
              </div>
              <p className="text-xs text-[#b89e8f] mt-2">+ 32 more online</p>
            </div>

            {/* Streak Tracker */}
            <div className="bg-gradient-to-br from-[#fbeee0] to-[#fff5f2] flex flex-col items-center rounded-2xl pt-5 pr-5 pb-5 pl-5 shadow-md border border-[#faede4]">
              <h4 className="font-semibold text-[#a07764] text-base mb-4">Streak Tracker</h4>
              <div className="flex space-x-2 mb-2">
                <ChaiCup opacity="100" />
                <ChaiCup opacity="60" />
                <ChaiCup opacity="30" />
              </div>
              <p className="text-[#a07764] text-sm font-semibold">🔥 3-day streak</p>
              <p className="text-xs text-[#b89e8f] mt-1">Keep the chai brewing!</p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

// Component for Chat Room Cards
function ChatRoomCard({ title, description, onlineCount, icon, gradient, textColor, buttonColor }) {
  return (
    <div className={`flex flex-col bg-gradient-to-br ${gradient} rounded-2xl shadow-md p-6 transition hover:scale-[1.03] hover:shadow-xl border border-[#faede4]`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-[#f9c7c7] rounded-full p-2">
          {icon}
        </span>
        <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
      </div>
      <p className="text-[#b89e8f] text-sm mb-5">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#b89e8f]">{onlineCount} online</span>
        <button className={`${buttonColor} text-[#593A27] px-3 py-1 rounded-full text-xs font-bold transition`}>Join</button>
      </div>
    </div>
  );
}

// Component for Active Users
function ActiveUser({ image, college, borderColor, bgColor }) {
  return (
    <div className="relative group">
      <Image 
        src={image}
        alt={college}
        width={28}
        height={28}
        className={`rounded-full border-2 ${borderColor} shadow transition transform hover:scale-110`}
      />
      <span className={`absolute left-1/2 transform -translate-x-1/2 top-8 text-xs px-2 py-0.5 rounded-xl ${bgColor} text-[#a07764] shadow-sm`}>
        {college}
      </span>
    </div>
  );
}

// Component for Chai Cup
function ChaiCup({ opacity }) {
  return (
    <div className={`chai-cup opacity-${opacity}`}>
      <div className="chai-steam"></div>
      <svg viewBox="0 0 32 24" fill="none" className="absolute bottom-0 left-0 w-full h-4"></svg>
    </div>
  );
} 