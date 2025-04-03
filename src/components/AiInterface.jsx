import React, { useState, useEffect } from 'react';
import { Send, X, Bot } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CHAT_STORAGE_KEY = 'chatbot_history';
const BASE_URL_KEY = 'apiBaseUrl';
const FORM_DETAILS_KEY = 'form_details';
const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function FloatingChatbot({ initialMessages }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : (initialMessages || [
      {
        id: '1',
        text: 'Hello! How can I help you today?',
        isUser: false,
        timestamp: new Date().toISOString()
      }
    ]);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState(localStorage.getItem(BASE_URL_KEY) || '');
  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const callChatAgent = async (question) => {
    setIsLoading(true);
    try {

      let storedAgentForms = JSON.parse(localStorage.getItem(FORM_DETAILS_KEY)) || {};
  
      let endpoint = baseUrl.trim();
      if (endpoint.endsWith('/')) {
        endpoint = endpoint.slice(0, -1);
      }
      
      if (!endpoint) {
        throw new Error('No API base URL configured');
      }
  
      if (!endpoint.startsWith('http://') && !endpoint.startsWith('https://')) {
        throw new Error('Invalid URL - must start with http:// or https://');
      }
      
      const response = await fetch(`${endpoint}/call_agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          authRole: "manager",
          chatHistory: messages.filter(m => !m.isLoading).map(m => ({
            role: m.isUser ? "user" : "assistant",
            content: m.text
          })),
          agent_forms: storedAgentForms 
        })
      });
      console.log({
        question: question,
        authRole: "manager",
        chatHistory: messages.filter(m => !m.isLoading).map(m => ({
          role: m.isUser ? "user" : "assistant",
          content: m.text
        })),
        agent_forms: storedAgentForms 
      })
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();

      if (data.agent_forms) {
        localStorage.setItem(FORM_DETAILS_KEY, JSON.stringify(data.agent_forms));
      }
  
      return data;
    } catch (error) {
      console.error('Error calling chat agent:', error);
      return { 
        error: error.message.includes('No API base URL configured') 
          ? "Please set the API base URL first (click the settings icon)"
          : `Error: ${error.message}`
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const loadingMessage = {
      id: 'loading-' + Date.now(),
      text: '',
      isUser: false,
      isLoading: true,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, loadingMessage]);

    const response = await callChatAgent(input);
    
    setMessages(prev => prev.filter(m => !m.isLoading));

    const botMessage = {
      id: Date.now().toString(),
      text: response.error || response.final_output || "I received your message but didn't get a proper response.",
      isUser: false,
      timestamp: new Date().toISOString()
    };

    if (response.plots) {
      botMessage.plots = response.plots;
    }

    if (response.encoded_image) {
      botMessage.encoded_image = response.encoded_image;
    }

    setMessages(prev => [...prev, botMessage]);
  };

  const clearChatHistory = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      localStorage.removeItem(FORM_DETAILS_KEY); 
      setMessages([
        {
          id: '1',
          text: 'Hello! How can I help you today?',
          isUser: false,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  };

  const updateBaseUrl = (newUrl) => {
    let cleanedUrl = newUrl.trim();
    if (cleanedUrl.endsWith('/')) {
      cleanedUrl = cleanedUrl.slice(0, -1);
    }
    localStorage.setItem(BASE_URL_KEY, cleanedUrl);
    setBaseUrl(cleanedUrl);
    setShowUrlInput(false);
  };

  const renderPlot = (plotData) => {
    if (!plotData) return null;

    switch (plotData.type) {
      case 'bar':
        return (
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={plotData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'pie':
        return (
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={plotData.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {plotData.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMessageContent = (message) => {
    return (
      <>
        <div className="break-words whitespace-pre-wrap">{message.text}</div>
        {message.plots && renderPlot(message.plots)}
        {message.encoded_image && (
          <div className="mt-2">
            <img 
              src={message.encoded_image} 
              alt="Analytics Plot" 
              className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-600"
            />
          </div>
        )}
        <div className="text-xs opacity-70 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="relative">
          <div className="w-96 h-[550px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header with controls */}
            <div className="bg-indigo-600 dark:bg-indigo-800 text-white p-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">Chat Assistant</h2>
                {/* <div className="text-xs opacity-80 truncate max-w-xs" title={baseUrl}>
                  {baseUrl ? `API: ${baseUrl}/call_agent` : "No API URL configured"}
                </div> */}
              </div>
              <div className="flex gap-2 items-center">
                {/* <button 
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-sm px-2 py-1 rounded hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-colors"
                  title="Configure API URL"
                >
                  Settings
                </button> */}
                <button 
                  onClick={clearChatHistory}
                  className="text-sm px-2 py-1 rounded hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-colors"
                  title="Clear chat history"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* API URL Input (shown when settings clicked) */}
            {showUrlInput && (
              <div className="bg-indigo-50 dark:bg-gray-700 p-3 border-b border-indigo-100 dark:border-gray-600">
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="https://your-api-url.com"
                    className="flex-1 text-xs px-3 py-2 rounded border border-indigo-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
                  />
                  <button
                    onClick={() => updateBaseUrl(baseUrl)}
                    className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition-colors text-sm"
                  >
                    Save
                  </button>
                </div>
                <div className="text-xs mt-1 text-indigo-700 dark:text-indigo-300">
                  Enter the base URL (e.g., https://your-api.com) without trailing slash
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {message.isLoading ? (
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    ) : (
                      renderMessageContent(message)
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-600 dark:text-white text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-indigo-600 dark:bg-indigo-700 text-white p-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors disabled:opacity-50 flex items-center justify-center"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105"
        >
          <Bot size={28} />
        </button>
      )}
    </div>
  );
}