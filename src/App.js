import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddAdminPage from './pages/Admin/AddAdminPage';
import HomePage from './pages/Home/HomePage';
import Dashboard from './pages/Home/Dashboard';
import ManageAdmin from './pages/Admin/ManageAdmin';
import ManageUser from './pages/User/ManageUser';
import AddUserPage from './pages/User/AddUserPage';
import LoginForm from './components/Admin/LoginForm';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<ManageAdmin />} />
          <Route path="/admin/add" element={<AddAdminPage />} />
          <Route path="/user" element={<ManageUser />} />
          <Route path="/user/add" element={<AddUserPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
