import React from 'react';
import { Users, CheckCircle, Brain, Clock, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import Analytics from './Analytics';

const Dashboard = () => {
  const stats = {
    totalTasks: 124,
    completedTasks: 89,
    activeUsers: 15,
    skillCoverage: 85
  };

  const recentTasks = [
    { id: 1, title: 'Frontend Development', assignedTo: 'John Doe', status: 'In Progress' },
    { id: 2, title: 'API Integration', assignedTo: 'Jane Smith', status: 'Completed' },
    { id: 3, title: 'Database Design', assignedTo: 'Mike Johnson', status: 'Pending' }
  ];

  return (
    <div className="p-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<ClipboardList className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />}
          title="Total Tasks"
          value={stats.totalTasks}
          trend="+12% from last month"
        />
        <StatCard
          icon={<CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />}
          title="Completed Tasks"
          value={stats.completedTasks}
          trend="+8% from last month"
        />
        <StatCard
          icon={<Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
          title="Active Users"
          value={stats.activeUsers}
          trend="+3 new this month"
        />
        <StatCard
          icon={<Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
          title="Skill Coverage"
          value={`${stats.skillCoverage}%`}
          trend="+5% from last month"
        />
      </div>

      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Recent Task Allocations</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-0">
                <th className="text-left py-3 px-4 dark:text-gray-300">Task</th>
                <th className="text-left py-3 px-4 dark:text-gray-300">Assigned To</th>
                <th className="text-left py-3 px-4 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task) => (
                <tr 
                  key={task.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 border-b-0"
                >
                  <td className="py-3 px-4 dark:text-gray-200">{task.title}</td>
                  <td className="py-3 px-4 dark:text-gray-200">{task.assignedTo}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      task.status === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      task.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                      'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-150">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      <Analytics/>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend }) => (
  <motion.div 
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center justify-between mb-4">
      {icon}
      <span className="text-sm text-green-600 dark:text-green-400">{trend}</span>
    </div>
    <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold dark:text-white">{value}</p>
  </motion.div>
);

export default Dashboard;