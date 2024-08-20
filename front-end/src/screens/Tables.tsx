import React from 'react';
import { Outlet } from 'react-router-dom';

const Tables: React.FC = () => (
  <div>
    <h1>Tables</h1>
    <Outlet />
  </div>
);

export default Tables;