import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../api';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    api.get('/auth/logout').then(() => {
      navigate('/');
    });
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center mb-4 border-b">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="space-x-4">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}>
          Tasks
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}>
          Profile
        </NavLink>
        <button onClick={handleLogout} className="text-red-600 hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
