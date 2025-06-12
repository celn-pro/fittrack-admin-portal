import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import HealthTips from './pages/HealthTips';
import DidYouKnow from './pages/DidYouKnow';
import Courses from './pages/Courses';
import SocialFeed from './pages/SocialFeed';
import Login from './pages/Login';
import Register from './pages/Register';
import { isAuthenticated } from './utils/auth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6 overflow-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/recommendations" element={<Recommendations />} />
                      <Route path="/health-tips" element={<HealthTips />} />
                      <Route path="/did-you-know" element={<DidYouKnow />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/social-feed" element={<SocialFeed />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;