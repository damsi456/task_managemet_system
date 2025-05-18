import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/current-user')
      .then(res => setUser(res.data))
      .catch(() => navigate('/'));
  }, []);

  const handleLogout = () => {
    api.get('/auth/logout')
      .then(() => navigate('/'));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user ? (
        <div className="space-y-4 bg-white shadow p-4 rounded border">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium">{user.displayName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{user.emails?.[0].value}</p>
          </div>
          <div>
            <img
              src={user.photos?.[0].value}
              alt="Profile"
              className="rounded-full w-24 h-24 mt-2"
            />
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
