'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Define the ChatRoom type
export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  text_color: string;
  button_color: string;
  online_count?: number; // This will come from our presence API
}

export function useChatRooms() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        console.log('Fetching chat rooms...');
        // Fetch chat rooms from Supabase
        const { data, error } = await supabase
          .from('chat_rooms')
          .select('id, name, description, icon, gradient, text_color, button_color')
          .order('created_at', { ascending: true });

        console.log('Supabase response:', { data, error });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Simulate online counts for now - in a real implementation, 
          // you would fetch this from your presence API
          const roomsWithOnlineCounts = data.map(room => ({
            ...room,
            online_count: Math.floor(Math.random() * 100) + 10 // Random number between 10-110
          }));

          console.log('Setting chat rooms:', roomsWithOnlineCounts);
          setChatRooms(roomsWithOnlineCounts);
        } else {
          console.log('No chat rooms found in Supabase. Using mock data.');
          // Add mock data for testing
          const mockRooms: ChatRoom[] = [
            {
              id: 'college-gossip',
              name: 'College Gossip',
              description: 'Share the latest rumors and stories from around campus',
              icon: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
              gradient: 'from-[#ffecb3] to-[#ffd54f]',
              text_color: 'text-[#e65100]',
              button_color: 'bg-[#ffd54f]',
              online_count: 64
            },
            {
              id: 'breakup',
              name: 'Breakup',
              description: 'Support group for those going through relationship challenges',
              icon: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
              gradient: 'from-[#f8bbd0] to-[#f06292]',
              text_color: 'text-[#880e4f]',
              button_color: 'bg-[#f06292]',
              online_count: 27
            },
            {
              id: 'hangout',
              name: 'Hangout',
              description: 'Chill conversations and casual hangout spot',
              icon: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
              gradient: 'from-[#c8e6c9] to-[#81c784]',
              text_color: 'text-[#2e7d32]',
              button_color: 'bg-[#81c784]',
              online_count: 52
            },
            {
              id: 'campus-events',
              name: 'Campus Events',
              description: 'Stay updated on the latest campus happenings',
              icon: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
              gradient: 'from-[#f3e5f5] to-[#e1bee7]',
              text_color: 'text-[#6a1b9a]',
              button_color: 'bg-[#e1bee7]',
              online_count: 35
            },
            {
              id: 'study-buddies',
              name: 'Study Buddies',
              description: 'Find study partners and ace your next exam',
              icon: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
              gradient: 'from-[#e3f2fd] to-[#bbdefb]',
              text_color: 'text-[#1565c0]',
              button_color: 'bg-[#bbdefb]',
              online_count: 28
            },
            {
              id: 'exam-burnout',
              name: 'Exam Burnout',
              description: 'Support and tips for managing exam stress and burnout',
              icon: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
              gradient: 'from-[#ffccbc] to-[#ff8a65]',
              text_color: 'text-[#bf360c]',
              button_color: 'bg-[#ff8a65]',
              online_count: 19
            }
          ];
          setChatRooms(mockRooms);
        }
      } catch (error: any) {
        console.error('Error fetching chat rooms:', error.message);
        setError(error.message);
        
        // Set mock data in case of an error
        console.log('Using mock data due to error');
        const mockRooms: ChatRoom[] = [
          {
            id: 'college-gossip',
            name: 'College Gossip',
            description: 'Share the latest rumors and stories from around campus',
            icon: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
            gradient: 'from-[#ffecb3] to-[#ffd54f]',
            text_color: 'text-[#e65100]',
            button_color: 'bg-[#ffd54f]',
            online_count: 64
          },
          {
            id: 'study-buddies',
            name: 'Study Buddies',
            description: 'Find study partners and ace your next exam',
            icon: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
            gradient: 'from-[#e3f2fd] to-[#bbdefb]',
            text_color: 'text-[#1565c0]',
            button_color: 'bg-[#bbdefb]',
            online_count: 28
          },
          {
            id: 'campus-events',
            name: 'Campus Events',
            description: 'Stay updated on the latest campus happenings',
            icon: '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
            gradient: 'from-[#f3e5f5] to-[#e1bee7]',
            text_color: 'text-[#6a1b9a]',
            button_color: 'bg-[#e1bee7]',
            online_count: 35
          }
        ];
        setChatRooms(mockRooms);
      } finally {
        setLoading(false);
      }
    }

    fetchChatRooms();
  }, []);

  return { chatRooms, loading, error };
}
