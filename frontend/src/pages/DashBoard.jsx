import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/current-user')
      .then(res => setUser(res.data))
      .catch(() => navigate('/'));
  }, []);

  const handleLogout = () => {
    api.get('/auth/logout').then(() => {
      setUser(null);
      navigate('/');
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <button onClick={handleLogout} className="text-sm bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>
      {user && (
        <div className="mt-4">
          <p>Welcome, {user.displayName}</p>
          <p>Email: {user.emails?.[0].value}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
