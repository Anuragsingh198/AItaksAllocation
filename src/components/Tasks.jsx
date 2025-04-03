import React, { useState } from 'react';
import { Plus, Filter, Search, Clock, Tag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import TaskForm from './TaskForm';

const Tasks = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Implement User Authentication',
      description: 'Add JWT-based authentication system with role-based access control',
      status: 'In Progress',
      priority: 'High',
      assignee: 'John Doe',
      dueDate: '2024-03-25',
      tags: ['Backend', 'Security']
    },
    {
      id: 2,
      title: 'Design Landing Page',
      description: 'Create a responsive landing page design with modern UI components',
      status: 'Todo',
      priority: 'Medium',
      assignee: 'Jane Smith',
      dueDate: '2024-03-28',
      tags: ['Frontend', 'Design']
    },
    {
      id: 3,
      title: 'Database Optimization',
      description: 'Optimize database queries and implement caching',
      status: 'Completed',
      priority: 'High',
      assignee: 'Mike Johnson',
      dueDate: '2024-03-22',
      tags: ['Database', 'Performance']
    }
  ]);

  const filteredTasks = filterStatus === 'all' ? tasks : tasks.filter(task => 
    task.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const handleTaskSubmit = (newTask) => {
    setTasks([...tasks, {
      ...newTask,
      id: Math.max(...tasks.map(t => t.id), 0) + 1
    }]);
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Tasks</h1>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTaskForm(true)}
          className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200 flex items-center gap-2 border-0"
        >
          <Plus className="w-4 h-4" />
           Create New Task
        </motion.button>
      </div>

      {showTaskForm && (
        <TaskForm 
          onClose={() => setShowTaskForm(false)} 
          onSubmit={handleTaskSubmit}
        />
      )}

      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white border-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white border-0"
              >
                <option value="all">All Tasks</option>
                <option value="todo">Todo</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <motion.div 
                key={task.id} 
                className="dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 border-0 shadow-sm"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg dark:text-white">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    task.status === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    task.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                    'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  } border-0`}>
                    {task.status}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>

                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Due {task.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <div className="flex gap-2">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-sm border-0"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Tasks;