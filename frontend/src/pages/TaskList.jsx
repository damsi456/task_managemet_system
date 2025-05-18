import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/current-user')
      .catch(() => navigate('/'));

    fetchTasks();
  }, []);

  const fetchTasks = () => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  const deleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const downloadPDF = () => {
    window.open('http://localhost:3000/tasks/report/pdf', '_blank');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Task List</h2>
        <div className="space-x-2">
          <Link to="/tasks/add" className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Task</Link>
          <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded">Download PDF</button>
        </div>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Assigned To</th>
            <th className="p-2 border">Deadline</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td className="p-2 border">{task.title}</td>
              <td className="p-2 border">{task.assignedTo}</td>
              <td className="p-2 border">{new Date(task.deadline).toLocaleDateString()}</td>
              <td className="p-2 border">{task.status}</td>
              <td className="p-2 border space-x-2">
                <Link to={`/tasks/edit/${task._id}`} className="text-blue-600">Edit</Link>
                <button onClick={() => deleteTask(task._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
