import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Tables: React.FC = () => (
  <div className='pt-4'>
    <ul className='font-bold flex items-center justify-center rounded-xl sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 bg-white shadow-md'>
      <li className='w-28 hover-effect-01 text-center py-2 border-r-2'><Link to="users">Users</Link></li>
      <li className='w-28 hover-effect-01 text-center py-2 border-r-2'><Link to="laptops">Laptops</Link></li>
      <li className='w-28 hover-effect-01 text-center py-2 border-r-2'><a href="">CCTV</a></li>
      <li className='w-28 hover-effect-01 text-center py-2 border-r-2'><a href="">PDA</a></li>
      <li className='w-28 hover-effect-01 text-center py-2'><a href="">Other Items</a></li>
    </ul>
    <Outlet />
  </div>
);

export default Tables;
