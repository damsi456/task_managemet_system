import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'deadline', direction: 'ascending' });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/current-user')
      .catch(() => navigate('/'));

    fetchTasks();
  }, []);

  useEffect(() => {
    // Apply filters and sorting whenever tasks, searchTerm, or statusFilter changes
    let result = [...tasks];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (sortConfig.key === 'deadline') {
          const dateA = new Date(a.deadline);
          const dateB = new Date(b.deadline);
          return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
        } else if (sortConfig.key === 'title') {
          return sortConfig.direction === 'ascending' 
            ? a.title.localeCompare(b.title) 
            : b.title.localeCompare(a.title);
        }
        return 0;
      });
    }
    
    setFilteredTasks(result);
  }, [tasks, searchTerm, statusFilter, sortConfig]);

  const fetchTasks = () => {
    api.get('/tasks')
      .then(res => {
        setTasks(res.data);
        setFilteredTasks(res.data);
      })
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

  const handleSort = (key) => {
    // If clicking the same key, toggle direction, otherwise set new key with ascending direction
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
    }));
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
      
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search by title or assignee..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="p-2 border rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th 
              className="p-2 border cursor-pointer" 
              onClick={() => handleSort('title')}
            >
              Title
              {sortConfig.key === 'title' && (
                <span className="ml-1">
                  {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th className="p-2 border">Assigned To</th>
            <th 
              className="p-2 border cursor-pointer" 
              onClick={() => handleSort('deadline')}
            >
              Deadline
              {sortConfig.key === 'deadline' && (
                <span className="ml-1">
                  {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                </span>
              )}
            </th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
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