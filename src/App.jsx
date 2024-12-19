import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Jobs } from './pages/Jobs';
import { Learning } from './pages/Learning';
import { Bikes } from './pages/Bikes';
import { Chat } from './pages/Chat';
import { Community } from './pages/Community';
import { News } from './pages/News';
import { Sharing } from './pages/Sharing';
import { Todos } from './pages/Todos';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/bikes" element={<Bikes />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/community" element={<Community />} />
            <Route path="/news" element={<News />} />
            <Route path="/sharing" element={<Sharing />} />
            <Route path="/todos" element={<Todos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;