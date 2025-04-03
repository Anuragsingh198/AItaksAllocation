import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Bot } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Team from './components/Teams';
import Tasks from './components/Tasks';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import ChatInterface from './components/AiInterface';
import TaskForm from './components/TaskForm';
import Chatbot from './components/Chatbot';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [showAi, setShowAI] = useState(false);
  const location = useLocation();
  const clientId = '522448111757-n79jvqjo4aai5vosmom5sn41kieidih6.apps.googleusercontent.com';

  // Close floating chat when navigating to chatbot page
  useEffect(() => {
    if (location.pathname === '/chatbot') {
      setShowAI(false);
    }
  }, [location.pathname]);

  // Determine if we should show the floating button
  const shouldShowButton = !showAi && location.pathname !== '/chatbot';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider>
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Sidebar />
          <main className="ml-64 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/task-form" element={<TaskForm />} />
                  {/* <Route path="/setting" element={<Settings />} /> */}
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>

          {shouldShowButton && (
            <button
              onClick={() => setShowAI(true)}
              className="fixed bottom-6 right-6 bg-blue-500 dark:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition z-50"
            >
              <Bot size={24} />
            </button>
          )}

          {showAi && <ChatInterface onClose={() => setShowAI(false)} />}
        </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}