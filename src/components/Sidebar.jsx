import React, { useEffect, useState } from 'react';
import { Home, Users, ClipboardList, Bot, User, LogOut, Shield, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import AdminLoginModal from './AdministrationLogin';
import { useValue } from '../Context/DataContext';

const Sidebar = () => {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { state: { admin }, dispatch } = useValue();


  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
    { icon: Bot, label: 'Talk With Ai', path: '/chatbot' },
    { icon: User, label: 'Profile', path: '/profile' },
   
  ];

  const handleLoginSuccess = (response) => {
    console.log('Google Login Response:', response);
    let userData = null;

    if (response.credential) {
      const { credential } = response;
      const payload = JSON.parse(atob(credential.split('.')[1]));
      
      console.log('Decoded JWT Payload:', payload);
      
      userData = {
        name: payload.name,
        email: payload.email,
        imageUrl: payload.picture
      };
    } else if (response.profileObj) {
      console.log('Google Profile Data:', response.profileObj);
      userData = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        imageUrl: response.profileObj.imageUrl
      };
    } else if (response.getAuthResponse) {
      const profile = response.getBasicProfile();
      userData = {
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl()
      };
    } else {
      console.warn('Unexpected Google response format:', response);
    }
    
    if (userData) {
      dispatch({ type: "LOGIN", payload: userData });
    }
    
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    console.log("logout");
    dispatch({ type: "LOGOUT" });
  };
  useEffect(()=>{
    console.log(admin);
  },[admin])

  return (
    <>
      <div className="h-screen w-64 bg-indigo-900 dark:bg-gray-800 text-white p-4 fixed left-0 top-0">
        <div className="flex items-center gap-2 mb-8">
          <ClipboardList className="w-8 h-8" />
          <h1 className="text-xl font-bold">TaskAI</h1>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isActive 
                    ? 'bg-indigo-800 dark:bg-gray-700 text-white' 
                    : 'text-indigo-200 hover:bg-indigo-800 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-800 dark:hover:bg-gray-700 w-full transition-all duration-200 hover:scale-105"
          >
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>

          {admin ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-800 dark:bg-gray-700">
                <User className="w-5 h-5 text-indigo-200" />
                <span className="text-indigo-200">{admin.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-800 dark:hover:bg-gray-700 w-full transition-all duration-200 hover:scale-105"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-800 dark:hover:bg-gray-700 w-full transition-all duration-200 hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              <span>Sign Up</span>
            </button>
          )}
        </div>
      </div>

      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Sidebar;