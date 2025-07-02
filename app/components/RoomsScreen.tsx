'use client';

export default function RoomsScreen() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-[#fbeee0]">
        <div className="flex items-center">
          <button className="mr-4 md:hidden hover:bg-[#fbeee0] p-1 rounded-full transition-colors" title="Back">
            <svg className="w-6 h-6" fill="none" stroke="#593A27" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-[#593A27]">Rooms</h2>
        </div>
      </div>
      
      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-[#fbeee0] rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[#593A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-[#593A27] mb-1">No Rooms Yet</h3>
        <p className="text-sm text-[#b89e8f] max-w-xs">When you join or create a room, it will appear here.</p>
      </div>
    </div>
  );
}
