import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';
import { chatService } from '../services/chat';
import { supabase } from '../utils/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
      chatService.initialize(token);
    }
    setLoading(false);
  }, []);

  const syncProfile = async (userData) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: userData._id,
          name: userData.name,
          avatar_url: userData.avatar_url
        }, {
          onConflict: 'user_id',
          returning: 'minimal'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error syncing profile:', error);
    }
  };

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      await syncProfile(data);
      setUser(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      chatService.initialize(data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      await syncProfile(data);
      setUser(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      chatService.initialize(data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};