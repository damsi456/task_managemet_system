import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
    status: 'Pending',
  });

  useEffect(() => {
    api.get(`/tasks/${id}`)
      .then(res => {
        const task = res.data;
        task.deadline = new Date(task.deadline).toISOString().split('T')[0]; // format date
        setFormData(task);
      })
      .catch(() => navigate('/tasks'));
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, formData);
      navigate('/tasks');
    } catch (err) {
      alert('Error updating task');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" required value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="assignedTo" required value={formData.assignedTo} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="deadline" type="date" required value={formData.deadline} onChange={handleChange} className="w-full p-2 border rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
