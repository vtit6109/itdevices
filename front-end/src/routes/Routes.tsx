// src/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Tables from '../screens/Tables';
import UsersTable from '../screens/tables/UsersTable';
import LaptopsTable from '../screens/tables/LaptopTable';
import Reports from '../screens/Reports';
import Manage from '../screens/Manage';
import Settings from '../screens/Settings';

const AppRouter: React.FC = () => {
  return (
    <div className='min-h-svh bg-custom-grey-light-01'>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tables" element={<Tables />}>
          <Route path="users" element={<UsersTable />} />
          <Route path="laptops" element={<LaptopsTable />} />
        </Route>
        <Route path="/reports" element={<Reports />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default AppRouter;