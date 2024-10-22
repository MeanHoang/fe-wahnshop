import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddAdminPage from './pages/Admin/AddAdminPage';
import HomePage from './pages/Home/HomePage';
import Dashboard from './pages/Home/Dashboard';
import ManageAdmin from './pages/Admin/ManageAdmin';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin" element={<ManageAdmin />} />
          <Route path="/admin/add" element={<AddAdminPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>

      </div>
    </Router>
  );

};

export default App;