import './App.css';
import AppRouter from './routes/Routes';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Navigate from './layouts/Navigate';
import { MenuOutlined } from '@ant-design/icons';
import { useState, memo, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);
const MemoizedAppRouter = memo(AppRouter);

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setIsNavOpen(!isNavOpen);
  }, [isNavOpen]);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const MemoizedNavigate = memo(() => <Navigate closeNav={closeNav} />);

  return (
    <Router>
      <div className='relative flex h-screen w-full font-custom-source-sans-3'>
        <div className={`fixed lg:w-[18%] w-[60%] h-full z-30 ${
          isNavOpen ? 'block animate-slideInLeft' : 'hidden lg:block'
        }`}>
          <MemoizedNavigate />
        </div>
        <div 
          className={`fixed top-0 left-0 w-full h-full bg-gray-500/50 z-20 ${
            isNavOpen ? 'block' : 'hidden'
          }`} 
          onClick={handleMenuClick}
        ></div>
        <MenuOutlined 
          className={`lg:hidden fixed p-3 z-40 menu-icon ${isNavOpen ? 'hidden' : ''}`} 
          style={{fontSize:'32px', color:'#ffffff'}} 
          onClick={handleMenuClick}
        />
        <div className='relative flex flex-col lg:flex-row w-full lg:w-[82%] ml-auto overflow-y-scroll z-10 transition-all duration-300'>
          <div className='w-full'>
            <MemoizedHeader />
            <MemoizedAppRouter />
            <MemoizedFooter />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;