'use client';

import { useState } from 'react';
import ParticlesBackground from './ParticlesBackground';
import ChatRoomPage from './ChatRoomPage';

interface RoomsScreenProps {
  onJoinRoom?: (roomId: string, roomName: string) => void;
}

export default function RoomsScreen({ onJoinRoom }: RoomsScreenProps) {
  const [roomCode, setRoomCode] = useState('');
  const [showRoomCodeInput, setShowRoomCodeInput] = useState(false);
  const [activeChatRoom, setActiveChatRoom] = useState<{id: string, name: string} | null>(null);
  
  // Handler function to show room code input
  const handleJoinRoomClick = () => {
    setShowRoomCodeInput(true);
  };
  
  // Handler function to join a room
  const handleJoinRoom = () => {
    if (roomCode.trim() === '') return;
    
    // If onJoinRoom prop is provided, use it (for integration with parent component)
    if (onJoinRoom) {
      onJoinRoom(roomCode.toLowerCase().replace(/\s+/g, '-'), roomCode);
    } else {
      // Otherwise handle locally
      setActiveChatRoom({ id: roomCode.toLowerCase().replace(/\s+/g, '-'), name: roomCode });
    }
    
    setRoomCode('');
    setShowRoomCodeInput(false);
  };

  // Handler function to go back from chat room
  const handleBackFromChatRoom = () => {
    setActiveChatRoom(null);
  };

  const handleCreateRoom = () => {
    // TODO: Implement create room functionality
    console.log('Create room clicked');
  };

  // If a chat room is active, show the chat room page
  if (activeChatRoom) {
    return (
      <ChatRoomPage 
        roomId={activeChatRoom.id} 
        roomName={activeChatRoom.name} 
        onBack={handleBackFromChatRoom} 
      />
    );
  }
  
  return (
    <>
      <ParticlesBackground />
      <div className="flex flex-col h-full bg-transparent">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-[#fbeee0] z-10">
          <div className="flex items-center">
            <button className="mr-4 md:hidden hover:bg-[#fbeee0] p-1 rounded-full transition-colors" title="Back">
              <svg className="w-6 h-6" fill="none" stroke="#593A27" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-[#593A27]">Rooms</h2>
          </div>
        </div>

        {/* Room Options */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6 z-10">
          {showRoomCodeInput ? (
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold text-[#593A27] mb-4">Enter Room Code</h3>
              <div className="flex items-center">
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="Room name or code"
                  className="flex-1 py-2 px-3 border border-[#fbeee0] rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#f9c7c7]"
                />
                <button
                  onClick={handleJoinRoom}
                  disabled={!roomCode.trim()}
                  className="bg-[#f9c7c7] hover:bg-[#fbeee0] text-[#593A27] px-4 py-2 rounded-r-lg font-medium transition-colors disabled:opacity-50"
                >
                  Join
                </button>
              </div>
              <button
                onClick={() => setShowRoomCodeInput(false)}
                className="mt-4 text-sm text-[#b89e8f] hover:text-[#593A27] transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              {/* Join Room Box */}
              <div
                className="room-option-box join-room-box group cursor-pointer w-full max-w-md p-6 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
                onClick={handleJoinRoomClick}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#593A27] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-[#593A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#593A27] mb-1">Join Room</h3>
                    <p className="text-sm text-[#b89e8f]">Enter a room code to join an existing conversation</p>
                  </div>
                </div>
                <div className="mt-4 ml-16 text-[#593A27] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Tap to join →
                </div>
              </div>

              {/* Create Room Box */}
              <div
                className="room-option-box create-room-box group cursor-pointer w-full max-w-md p-6 bg-gradient-to-br from-[#593A27] to-[#8B5E34] rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
                onClick={handleCreateRoom}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-[#fbeee0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#fbeee0] mb-1">Create Your Own Room</h3>
                    <p className="text-sm text-[#fbeee0] opacity-80">Start a new room and invite others</p>
                  </div>
                </div>
                <div className="mt-4 ml-16 text-[#fbeee0] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Tap to create →
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
