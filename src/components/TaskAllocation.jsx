import React, { useState  , useEffect} from 'react';
import { Send, Plus } from 'lucide-react';
import { useValue } from '../Context/DataContext';

const TaskAllocation = () => {

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">AI Task Allocation</h2>
      
      <div className="flex flex-col space-y-4">
        <div className="flex-1 overflow-y-auto max-h-96 space-y-4 p-4 bg-gray-50 rounded-lg">
          
          <div className="flex flex-col space-y-2">
            <div className="bg-indigo-100 text-indigo-900 p-3 rounded-lg self-start max-w-[80%]">
              How can I help you with task allocation today?
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the task or ask for recommendations..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
          <button
            type="button"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskAllocation;