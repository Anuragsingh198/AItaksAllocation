import React from 'react';
import { MessageSquare, Plus, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChatList({ chats, activeChat, onSelectChat, onNewChat }) {
  return (
    <div className="w-64 bg-gray-900 text-gray-100 h-full flex flex-col dark:bg-gray-700">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 m-4 p-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors dark:bg-gray-900"
      >
        <Plus size={18} />
        <span>New Chat</span>
      </button>
      
      <div className="flex-1 overflow-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left p-3 flex items-center gap-2 hover:bg-gray-800 transition-colors ${
              activeChat === chat.id ? 'bg-gray-800' : ''
            }`}
          >
            <MessageSquare size={18} />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm">{chat.preview}</p>
              <p className="text-xs text-gray-400">{chat.timestamp}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors w-full"
        >
          <Home size={18} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
