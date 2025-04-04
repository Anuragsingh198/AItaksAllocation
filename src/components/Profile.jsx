import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Mail, Phone, MapPin, Server } from 'lucide-react';
import { useTheme } from '../Context/Theme';

const Profile = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [profile, setProfile] = useState({
    name: 'kartk Avinah',
    email: 'kartik@gmail.com',
    phone: '+91 73356 63451',
    location: 'Madhya Pradesh , India',
    bio: 'Passionate about creating efficient and scalable solutions.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python'],
  });
  const [apiBaseUrl, setApiBaseUrl] = useState(localStorage.getItem('apiBaseUrl') || '');
  const [apiSettings, setApiSettings] = useState({
    isLoading: false,
    error: null,
    success: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  const handleSkillAdd = () => {
    const skill = prompt('Enter new skill:');
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const handleApiSubmit = (e) => {
    e.preventDefault();
    
    let cleanedUrl = apiBaseUrl.trim();
    if (cleanedUrl.endsWith('/')) {
      cleanedUrl = cleanedUrl.slice(0, -1);
    }
    
    if (!cleanedUrl.startsWith('http://') && !cleanedUrl.startsWith('https://')) {
      setApiSettings(prev => ({ 
        ...prev, 
        error: 'URL must start with http:// or https://',
        success: false
      }));
      return;
    }

    setApiSettings(prev => ({ ...prev, isLoading: true, error: null }));

    try {
     
      localStorage.setItem('apiBaseUrl', cleanedUrl);
      setApiBaseUrl(cleanedUrl);
      
      setApiSettings(prev => ({ 
        ...prev, 
        isLoading: false,
        error: null,
        success: true
      }));
      
      setTimeout(() => {
        setApiSettings(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      setApiSettings(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Failed to save settings',
        success: false
      }));
    }
  };

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold dark:text-white">Profile Settings</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="space-y-6">
        
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['name', 'email', 'phone', 'location'].map((field, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <div className="relative">
                      {field === 'name' && <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
                      {field === 'email' && <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
                      {field === 'phone' && <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
                      {field === 'location' && <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
                      <input
                        type="text"
                        value={profile[field]}
                        onChange={(e) => setProfile(prev => ({ ...prev, [field]: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </motion.div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                  <motion.button
                    type="button"
                    onClick={handleSkillAdd}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    + Add Skill
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Profile Changes
              </motion.button>
            </form>
          </div>

          {/* API Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <form onSubmit={handleApiSubmit} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold dark:text-white">API Settings</h2>
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">API Base URL</label>
                <div className="relative">
                  <Server className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={apiBaseUrl}
                    onChange={(e) => setApiBaseUrl(e.target.value)}
                    placeholder="https://your-api-url.com"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Current API base: {apiBaseUrl || 'Not set'}
                </p>
              </motion.div>
              
              {apiSettings.error && (
                <div className="text-red-500 text-sm">
                  {apiSettings.error}
                </div>
              )}
              
              {apiSettings.success && (
                <div className="text-green-500 text-sm">
                  API settings saved successfully!
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save API Settings
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;