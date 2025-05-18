import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/current-user')
      .then(res => setUser(res.data))
      .catch(() => navigate('/'));

    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(() => setTasks([]));
  }, []);

  const handleLogout = () => {
    api.get('/auth/logout').then(() => {
      navigate('/');
    });
  };

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    done: tasks.filter(t => t.status === 'Done').length,
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <button onClick={handleLogout} className="text-sm bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>

      {user && (
        <div className="mb-6">
          <h3 className="text-lg font-medium">Welcome, {user.displayName} 👋</h3>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded border">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <p className="text-xl font-bold">{taskStats.total}</p>
        </div>
        <div className="bg-yellow-100 shadow p-4 rounded border">
          <p className="text-sm text-gray-700">Pending</p>
          <p className="text-xl font-bold">{taskStats.pending}</p>
        </div>
        <div className="bg-blue-100 shadow p-4 rounded border">
          <p className="text-sm text-gray-700">In Progress</p>
          <p className="text-xl font-bold">{taskStats.inProgress}</p>
        </div>
        <div className="bg-green-100 shadow p-4 rounded border">
          <p className="text-sm text-gray-700">Completed</p>
          <p className="text-xl font-bold">{taskStats.done}</p>
        </div>
      </div>

      <Link to="/tasks" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
        Go to Task Manager
      </Link>
    </div>
  );
};

export default Dashboard;
