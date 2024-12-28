import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { Chatbot } from './components/chat/Chatbot';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Profile } from './pages/Profile';
import { Jobs } from './pages/Jobs';
import { Learning } from './pages/Learning';
import { Bikes } from './pages/Bikes';
import { Chat } from './pages/Chat';
import { Community } from './pages/Community';
import { News } from './pages/News';
import { Sharing } from './pages/Sharing';
import { Todos } from './pages/Todos';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/bikes" element={<Bikes />} />
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } />
            <Route path="/news" element={<News />} />
            <Route path="/sharing" element={
              <ProtectedRoute>
                <Sharing />
              </ProtectedRoute>
            } />
            <Route path="/todos" element={
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}