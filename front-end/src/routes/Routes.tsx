import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../screens/Home';
import About from '../screens/About';

const AppRouter: React.FC = () => {
  return (
    <div className='h-[2000px]'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
     
  );
};
export default AppRouter;
