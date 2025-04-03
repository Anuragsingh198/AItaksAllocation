import React, { useState, useEffect } from 'react';
import { Save, Bell, User, Server } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    taskUpdates: true,
    teamChanges: false
  });

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Manager',
    timezone: 'UTC-5'
  });

  const [apiSettings, setApiSettings] = useState({
    baseUrl: '',
    isLoading: false,
    error: null,
    success: false
  });

  // Load saved base URL on component mount
  useEffect(() => {
    const loadBaseUrl = async () => {
      try {
        const response = await fetch('/api/get_base_url');
        if (response.ok) {
          const data = await response.json();
          if (data.baseUrl) {
            setApiSettings(prev => ({ 
              ...prev, 
              baseUrl: data.baseUrl,
              error: null
            }));
          }
        }
      } catch (error) {
        console.error('Error loading base URL:', error);
        setApiSettings(prev => ({ 
          ...prev, 
          error: 'Failed to load API settings'
        }));
      }
    };
    loadBaseUrl();
  }, []);

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Profile save logic here
  };

  const handleApiSubmit = async (e) => {
    e.preventDefault();
    
    // Clean up the URL - remove trailing slashes and spaces
    let cleanedUrl = apiSettings.baseUrl.trim();
    if (cleanedUrl.endsWith('/')) {
      cleanedUrl = cleanedUrl.slice(0, -1);
    }
    
    // Basic URL validation
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
      // Save to server
      const response = await fetch('/api/save_base_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ baseUrl: cleanedUrl })
      });
      
      if (response.ok) {
        setApiSettings(prev => ({ 
          ...prev, 
          baseUrl: cleanedUrl,
          isLoading: false,
          error: null,
          success: true
        }));
        // Clear success message after 3 seconds
        setTimeout(() => {
          setApiSettings(prev => ({ ...prev, success: false }));
        }, 3000);
      } else {
        throw new Error('Failed to save API settings');
      }
    } catch (error) {
      console.error('Error saving API settings:', error);
      setApiSettings(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Failed to save API settings',
        success: false
      }));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Profile Settings</h2>
          </div>
          <form onSubmit={handleProfileSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={profile.timezone}
                  onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">UTC</option>
                  <option value="UTC+1">Central European Time (UTC+1)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
            </div>
            <div className="space-y-4">
              {Object.keys(notifications).map((key) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <p className="text-sm text-gray-600">Toggle {key} notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={() => handleNotificationChange(key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* API Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-6">
              <Server className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">API Settings</h2>
            </div>
            <form onSubmit={handleApiSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Base URL</label>
                  <input
                    type="url"
                    value={apiSettings.baseUrl}
                    onChange={(e) => setApiSettings(prev => ({ ...prev, baseUrl: e.target.value }))}
                    placeholder="https://your-api-url.com"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be used as the base for all API calls (e.g., {apiSettings.baseUrl || 'https://...'}/call_agent)</p>
                </div>
                
                {apiSettings.error && (
                  <div className="text-red-500 text-sm">{apiSettings.error}</div>
                )}
                
                {apiSettings.success && (
                  <div className="text-green-500 text-sm">API settings saved successfully!</div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50"
                  disabled={apiSettings.isLoading}
                >
                  {apiSettings.isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save API Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;