import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
    status: 'Pending',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', formData);
      navigate('/tasks');
    } catch (err) {
      alert('Error creating task');
    }
  };

  return (
    <>
        <NavBar/>
        <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="title" required placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
            <input name="assignedTo" required placeholder="Assigned To" value={formData.assignedTo} onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="deadline" type="date" required value={formData.deadline} onChange={handleChange} className="w-full p-2 border rounded" />
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Task</button>
        </form>
        </div>
    </>
  );
};

export default AddTask;
