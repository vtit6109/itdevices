import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import Logo from '../assets/logo.png';
import { VscDashboard } from "react-icons/vsc";
import { BsTable } from "react-icons/bs";
import { FaChartBar } from "react-icons/fa";
import { PiToolboxFill } from "react-icons/pi";
import { RiFolderSettingsFill } from "react-icons/ri";
interface NavigateProps {
  closeNav: () => void;
}

const Navigate: React.FC<NavigateProps> = ({ closeNav }) => {
  const handleLinkClick = () => {
      closeNav();
  };

  return (
    <div className="bg-custom-navy-dark h-full text-white">
      <div className="bg-custom-navy-light p-3">
        <h1 className="font-bold text-center flex justify-center">
          <Avatar
            size={{ sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={Logo}
            style={{border: '2px solid green'}}
          />
          <div className='my-auto ml-5'>
            <div>Guest</div>
            <div className='text-green-500'>Online</div>
          </div>
        </h1>
      </div>

      <div className='border-b-[1px] border-orange-500'>
        <p className='font-bold text-xl p-4'>General</p>
      </div>
      <ul>
        <li><Link to='/' className='flex hover-effect-01 p-4 items-center font-bold' onClick={handleLinkClick}><span className='pr-2'><VscDashboard size={25} /></span> <p>Dashboard</p></Link></li>
        <li><Link to='/tables' className='flex hover-effect-01 p-4 items-center font-bold' onClick={handleLinkClick}><span className='mr-2 pr-1'><BsTable size={18}/></span> <p>Tables</p></Link></li>
        <li><Link to='/reports' className='flex hover-effect-01 p-4 items-center font-bold' onClick={handleLinkClick}><span className='mr-2 pr-1'><FaChartBar size={20} /></span> <p>Reports</p></Link></li>
        <li><Link to='/manage' className='flex hover-effect-01 p-4 items-center font-bold' onClick={handleLinkClick}><span className='mr-2 pr-1'><PiToolboxFill size={22} /></span> <p>Manage</p></Link></li>
        <li><Link to='/settings' className='flex hover-effect-01 p-4 items-center font-bold' onClick={handleLinkClick}><span className='mr-2 pr-1'><RiFolderSettingsFill size={22} /></span> <p>Setting</p></Link></li>
      </ul>
    </div>
  )
}

export default Navigate;