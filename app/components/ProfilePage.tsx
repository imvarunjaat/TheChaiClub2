'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import Image from 'next/image';

interface ProfilePageProps {
  onComplete: () => void;
  isNewUser?: boolean;
}

export default function ProfilePage({ onComplete, isNewUser = false }: ProfilePageProps) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load existing profile data if user exists
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('name, college, avatar_url')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setName(data.name || '');
          setCollege(data.college || '');
          setAvatarUrl(data.avatar_url || '');
        }
      } catch (err: any) {
        console.error('Error loading user profile:', err.message);
      }
    };
    
    loadUserProfile();
  }, [user]);

  // Handle avatar upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    if (!user) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    setIsUploading(true);
    setError('');
    
    try {
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const publicUrl = data.publicUrl;
      
      setAvatarUrl(publicUrl);
    } catch (err: any) {
      setError('Error uploading avatar: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle profile save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    setError('');
    setSuccess('');
    
    try {
      // Update the user profile in the database
      const { error } = await supabase
        .from('users')
        .update({
          name,
          college,
          avatar_url: avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f9c7c7&color=593A27`,
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      setSuccess('Profile updated successfully!');
      
      // If this is a new user completing their profile, call onComplete
      if (isNewUser) {
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    } catch (err: any) {
      setError('Error saving profile: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4 sm:p-6">
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#f9c7c7] to-[#fbeee0] p-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#593A27] text-center">
            {isNewUser ? 'Complete Your Profile' : 'Edit Your Profile'}
          </h2>
        </div>
        
        <form onSubmit={handleSaveProfile} className="p-5 sm:p-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative group mb-3">
              {avatarUrl ? (
                <Image 
                  src={avatarUrl}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-[#f9c7c7] shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#f9c7c7] to-[#fbeee0] flex items-center justify-center text-[#593A27] text-3xl font-bold border-4 border-[#f9c7c7] shadow-md">
                  {name ? name.charAt(0).toUpperCase() : '?'}
                </div>
              )}
              
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer">
                <span className="text-white text-xs font-medium">Change Photo</span>
              </div>
              
              <input 
                type="file" 
                accept="image/*"
                onChange={handleAvatarUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isUploading}
                title="Upload profile photo"
                aria-label="Upload profile photo"
              />
            </div>
            
            {isUploading && (
              <span className="text-sm text-[#593A27]">Uploading...</span>
            )}
          </div>
          
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-[#593A27] mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-[#fbeee0] focus:outline-none focus:ring-2 focus:ring-[#f9c7c7]"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          {/* College Input */}
          <div className="mb-6">
            <label htmlFor="college" className="block text-sm font-medium text-[#593A27] mb-1">
              College
            </label>
            <input
              id="college"
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-[#fbeee0] focus:outline-none focus:ring-2 focus:ring-[#f9c7c7]"
              placeholder="Enter your college name"
              required
            />
          </div>
          
          {/* Error and Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm">
              {success}
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-2 px-4 bg-gradient-to-r from-[#f9c7c7] via-[#fbeee0] to-[#b89e8f] text-[#593A27] rounded-xl font-bold shadow-md hover:shadow-lg transition transform hover:scale-[1.02] focus:outline-none disabled:opacity-70"
          >
            {isSaving ? 'Saving...' : (isNewUser ? 'Complete Profile' : 'Save Changes')}
          </button>
          
          {!isNewUser && (
            <button
              type="button"
              onClick={onComplete}
              className="w-full mt-3 py-2 px-4 bg-transparent border border-[#b89e8f] text-[#593A27] rounded-xl font-medium hover:bg-[#fbeee0]/20 transition focus:outline-none"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
