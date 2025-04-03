import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { motion } from 'framer-motion';

const Analytics = () => {
  // Tasks by Difficulty
  const difficultyData = [
    { name: 'Easy', tasks: 35, color: '#10B981' },
    { name: 'Medium', tasks: 50, color: '#F59E0B' },
    { name: 'Hard', tasks: 25, color: '#EF4444' },
    { name: 'Expert', tasks: 15, color: '#8B5CF6' }
  ];

  // Tasks by Status
  const statusData = [
    { name: 'Completed', value: 45, color: '#10B981' },
    { name: 'In Progress', value: 30, color: '#3B82F6' },
    { name: 'Pending', value: 15, color: '#F59E0B' },
    { name: 'Blocked', value: 10, color: '#EF4444' }
  ];

  // Tasks Assigned to Users
  const userAssignmentData = [
    { name: 'Alex', tasks: 18, avatar: 'A' },
    { name: 'Jamie', tasks: 22, avatar: 'J' },
    { name: 'Taylor', tasks: 15, avatar: 'T' },
    { name: 'Morgan', tasks: 12, avatar: 'M' },
    { name: 'Casey', tasks: 8, avatar: 'C' },
    { name: 'Riley', tasks: 5, avatar: 'R' }
  ];

  // Tasks Created Over Time
  const creationTrendData = [
    { month: 'Jan', tasks: 12 },
    { month: 'Feb', tasks: 18 },
    { month: 'Mar', tasks: 22 },
    { month: 'Apr', tasks: 25 },
    { month: 'May', tasks: 30 },
    { month: 'Jun', tasks: 28 },
    { month: 'Jul', tasks: 35 }
  ];

  // Completion Rate by Domain
  const domainCompletionData = [
    { domain: 'Frontend', completed: 45, total: 50 },
    { domain: 'Backend', completed: 38, total: 45 },
    { domain: 'DevOps', completed: 20, total: 25 },
    { domain: 'Design', completed: 15, total: 20 },
    { domain: 'QA', completed: 12, total: 15 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-xl border border-gray-700">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={`tooltip-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Task Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks by Difficulty */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Tasks by Difficulty Level</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={difficultyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="tasks" 
                  name="Tasks"
                  animationDuration={1500}
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tasks by Status */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Task Status Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  animationDuration={1000}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tasks Assigned to Users */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Tasks Assigned per Team Member</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userAssignmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="avatar" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  content={<CustomTooltip />}
                  formatter={(value) => [`${value} tasks`, '']}
                  labelFormatter={(label) => userAssignmentData.find(d => d.avatar === label)?.name}
                />
                <Bar 
                  dataKey="tasks" 
                  name="Tasks"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tasks Created Over Time */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Task Creation Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={creationTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="tasks" 
                  name="Tasks Created"
                  stroke="#EC4899" 
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8, fill: '#EC4899' }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Completion Rate by Domain */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 lg:col-span-2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Completion Rate by Domain</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainCompletionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="domain" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  content={<CustomTooltip />}
                  formatter={(value, name) => {
                    if (name === 'completed') return [value, 'Completed'];
                    if (name === 'total') return [value, 'Total'];
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="completed" 
                  name="Completed"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
                <Bar 
                  dataKey="total" 
                  name="Total"
                  fill="#6B7280"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <motion.div 
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white"
          whileHover={{ y: -5 }}
        >
          <h3 className="font-medium mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold">125</p>
          <p className="text-sm opacity-80 mt-1">+15% from last month</p>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"
          whileHover={{ y: -5 }}
        >
          <h3 className="font-medium mb-2">Completed Tasks</h3>
          <p className="text-3xl font-bold">92</p>
          <p className="text-sm opacity-80 mt-1">73.6% completion rate</p>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white"
          whileHover={{ y: -5 }}
        >
          <h3 className="font-medium mb-2">Avg. Completion Time</h3>
          <p className="text-3xl font-bold">3.2d</p>
          <p className="text-sm opacity-80 mt-1">Faster than last month</p>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
          whileHover={{ y: -5 }}
        >
          <h3 className="font-medium mb-2">Active Members</h3>
          <p className="text-3xl font-bold">6</p>
          <p className="text-sm opacity-80 mt-1">Working on 35 tasks</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;


// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { motion } from 'framer-motion';

// const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// const Analytics = ({ dashboardData }) => {

//   const tasksByStatusData = Object.entries(dashboardData?.tasks_by_status || {}).map(([name, value]) => ({
//     name,
//     value
//   }));

//   const tasksOverTimeData = Object.entries(dashboardData?.tasks_over_time || {}).map(([date, count]) => ({
//     date,
//     count
//   })).sort((a, b) => new Date(a.date) - new Date(b.date));

//   const avgCompletionTime = dashboardData?.time_to_completion?.length 
//     ? (dashboardData.time_to_completion.reduce((a, b) => a + b, 0) / dashboardData.time_to_completion.length).toFixed(1)
//     : 0;

//   return (
//     <div className="p-6 dark:bg-gray-900">
//       <h1 className="text-2xl font-bold mb-6 dark:text-white">Analytics Dashboard</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         <motion.div 
//           className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           whileHover={{ scale: 1.01 }}
//           transition={{ duration: 0.2 }}
//         >
//           <h2 className="text-lg font-semibold mb-4 dark:text-white">Tasks by Status</h2>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={tasksByStatusData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={120}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {tasksByStatusData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#F3F4F6' }} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </motion.div>

      
//         <motion.div 
//           className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//           whileHover={{ scale: 1.01 }}
//           transition={{ duration: 0.2 }}
//         >
//           <h2 className="text-lg font-semibold mb-4 dark:text-white">Tasks Created Over Time</h2>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={tasksOverTimeData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis dataKey="date" stroke="#9CA3AF" />
//                 <YAxis stroke="#9CA3AF" />
//                 <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#F3F4F6' }} />
//                 <Legend />
//                 <Bar dataKey="count" fill="#4F46E5" name="Tasks Created" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </motion.div>


//         <motion.div 
//           className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:col-span-2"
//           whileHover={{ scale: 1.01 }}
//           transition={{ duration: 0.2 }}
//         >
//           <h2 className="text-lg font-semibold mb-4 dark:text-white">Performance Metrics</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-indigo-50 dark:bg-indigo-900/50 rounded-lg p-4">
//               <h3 className="text-indigo-800 dark:text-indigo-200 font-medium mb-2">Avg Completion Time</h3>
//               <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{avgCompletionTime} hours</p>
//               <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
//                 {dashboardData?.time_to_completion?.length || 0} tasks completed
//               </p>
//             </div>
//             <div className="bg-green-50 dark:bg-green-900/50 rounded-lg p-4">
//               <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">Task Status Distribution</h3>
//               <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//                 {Object.keys(dashboardData?.tasks_by_status || {}).length} statuses
//               </p>
//               <p className="text-sm text-green-600 dark:text-green-400 mt-1">
//                 {Object.values(dashboardData?.tasks_by_status || {}).reduce((a, b) => a + b, 0)} total tasks
//               </p>
//             </div>
//             <div className="bg-yellow-50 dark:bg-yellow-900/50 rounded-lg p-4">
//               <h3 className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">Task Creation Period</h3>
//               <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
//                 {Object.keys(dashboardData?.tasks_over_time || {}).length} days
//               </p>
//               <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
//                 {Object.values(dashboardData?.tasks_over_time || {}).reduce((a, b) => a + b, 0)} tasks created
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;