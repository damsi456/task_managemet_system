import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/DashBoard';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/tasks/add" element={<AddTask />} />
      <Route path="/tasks/edit/:id" element={<EditTask />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;