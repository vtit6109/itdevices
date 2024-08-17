import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Tables from '../screens/Tables';
import Reports from '../screens/Reports';
import Manage from '../screens/Manage';
import Settings from '../screens/Settings';

const AppRouter: React.FC = () => {
  return (
    <div className='min-h-svh'>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
