'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface ChatMessage {
  id: string;
  user_id: string;
  room_id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

export interface OnlineUser {
  id: string;
  name: string;
  avatar_url: string;
}

export function useChatRoom(roomId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id, 
          user_id, 
          room_id, 
          content, 
          created_at,
          user:users(id, name, avatar_url)
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      // Reverse to get oldest messages first and ensure type compatibility
      setMessages(data ? data.map(message => ({
        ...message,
        user: Array.isArray(message.user) && message.user.length > 0 
          ? message.user[0] 
          : { id: '', name: '', avatar_url: '' }
      })).reverse() : []);
    } catch (error: any) {
      console.error('Error fetching messages:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch online users
  const fetchOnlineUsers = async () => {
    try {
      // This would normally call the presence API endpoint
      // For now, we'll simulate with a basic fetch
      const response = await fetch(`https://vkbsjkegzftbkkgdkrkt.supabase.co/functions/v1/user-presence?action=get&roomId=${roomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.auth.getSession().then(({ data }) => data.session?.access_token)}`
        }
      });
      
      const data = await response.json();
      
      if (data && data.users) {
        setOnlineUsers(data.users);
      }
    } catch (error: any) {
      console.error('Error fetching online users:', error.message);
    }
  };

  // Function to send a message
  const sendMessage = async (content: string) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      const { data, error } = await supabase
        .from('messages')
        .insert({
          user_id: userId,
          room_id: roomId,
          content
        })
        .select('id');
      
      if (error) throw error;
      
      // Optimistically add the message to the UI
      const newMessage: ChatMessage = {
        id: data?.[0]?.id || 'temp-id-' + Date.now(),
        user_id: userId,
        room_id: roomId,
        content,
        created_at: new Date().toISOString(),
        user: {
          id: userId,
          name: sessionData.session?.user?.user_metadata?.name || 'Unknown',
          avatar_url: sessionData.session?.user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(sessionData.session?.user?.user_metadata?.name || 'U')}&background=f9c7c7&color=593A27`,
        }
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      return true;
    } catch (error: any) {
      console.error('Error sending message:', error.message);
      return false;
    }
  };

  // Join room and register presence
  const joinRoom = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      
      if (!userId) {
        return; // Not authenticated
      }
      
      // Call the presence API endpoint
      await fetch(`https://vkbsjkegzftbkkgdkrkt.supabase.co/functions/v1/user-presence?action=join&roomId=${roomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session?.access_token}`
        },
        body: JSON.stringify({
          userId,
          name: sessionData.session?.user?.user_metadata?.name,
          avatarUrl: sessionData.session?.user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(sessionData.session?.user?.user_metadata?.name || 'U')}&background=f9c7c7&color=593A27`
        })
      });
    } catch (error: any) {
      console.error('Error joining room:', error.message);
    }
  };

  // Leave room
  const leaveRoom = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      
      if (!userId) {
        return; // Not authenticated
      }
      
      // Call the presence API endpoint
      await fetch(`https://vkbsjkegzftbkkgdkrkt.supabase.co/functions/v1/user-presence?action=leave&roomId=${roomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session?.access_token}`
        },
        body: JSON.stringify({ userId })
      });
    } catch (error: any) {
      console.error('Error leaving room:', error.message);
    }
  };

  // Set up real-time subscription for new messages
  useEffect(() => {
    setLoading(true);
    
    // Fetch initial messages
    fetchMessages();
    
    // Fetch initial online users
    fetchOnlineUsers();
    
    // Join the room
    joinRoom();
    
    // Set up real-time subscription for new messages
    const subscription = supabase
      .channel(`room-${roomId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomId}`
      }, async (payload) => {
        // If this message was sent by another user, fetch the user details
        if (payload.new && payload.new.user_id) {
          const { data: userData } = await supabase
            .from('users')
            .select('id, name, avatar_url')
            .eq('id', payload.new.user_id)
            .single();
            
          const newMessage: ChatMessage = {
            ...payload.new as any,
            user: userData || { 
              id: payload.new.user_id,
              name: 'Unknown',
              avatar_url: `https://ui-avatars.com/api/?name=U&background=f9c7c7&color=593A27`
            }
          };
          
          // Don't add duplicate messages
          setMessages(prev => {
            if (!prev.some(msg => msg.id === newMessage.id)) {
              return [...prev, newMessage];
            }
            return prev;
          });
        }
      })
      .subscribe();
      
    // Poll for online users every 10 seconds
    const onlineUsersInterval = setInterval(() => {
      fetchOnlineUsers();
    }, 10000);
    
    // Clean up
    return () => {
      leaveRoom();
      subscription.unsubscribe();
      clearInterval(onlineUsersInterval);
    };
  }, [roomId]);

  return { messages, onlineUsers, loading, error, sendMessage };
}
