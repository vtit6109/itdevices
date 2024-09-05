import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { VscDashboard } from "react-icons/vsc";
import { BsTable } from "react-icons/bs";
import { FaChartBar, FaUserShield, FaUser, FaUserSecret } from "react-icons/fa";
import { PiToolboxFill } from "react-icons/pi";
import { RiFolderSettingsFill } from "react-icons/ri";
import { useDataFetching } from '../hooks/useDataFetching'; // Import useDataFetching hook

interface NavigateProps {
  closeNav: () => void;
}

const Navigate: React.FC<NavigateProps> = ({ closeNav }) => {
  const handleLinkClick = () => {
    closeNav();
  };

  const { account } = useDataFetching(); // Sử dụng hook useDataFetching để lấy thông tin tài khoản

  console.log(account); // Kiểm tra dữ liệu tài khoản

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <FaUserShield size={40} />;
      case 'user':
        return <FaUser size={40} />;
      case 'guest':
        return <FaUserSecret size={40} />;
      default:
        return <FaUser size={40} />;
    }
  };

  return (
    <div className="bg-custom-navy-dark h-full text-white">
      <div className="bg-custom-navy-light p-3">
        <h1 className="font-bold text-center flex justify-center items-center">
          <Avatar
            size={{ sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={account ? getRoleIcon(account.accountRole) : <FaUserSecret size={40} />}
            style={{ border: '2px solid green' }}
          />
          <div className='ml-5 text-left'>
            {account ? (
              <>
                <p className="text-lg font-semibold">{account.accountName}</p>
                <p className="text-sm text-gray-400">{account.accountRole}</p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold">Guest</p>
                <p className="text-sm text-green-500">Online</p>
              </>
            )}
          </div>
        </h1>
      </div>

      <div className='border-b-[1px] border-orange-500'>
        <p className='font-bold text-xl p-4'>General</p>
      </div>
      <ul>
        <li><Link to='/' className='flex hover-effect-01 ml-4 py-4 items-center font-bold' onClick={handleLinkClick}><span className='pr-2'><VscDashboard size={25} /></span> <p>Dashboard</p></Link></li>
        <li><Link to='/tables' className='flex hover-effect-01 ml-4 py-4 items-center font-bold' onClick={handleLinkClick}><span className='mr-2 pr-1'><BsTable size={18} /></span> <p>Tables</p></Link></li>
        <li><Link to='/reports' className='flex hover-effect-01 ml-4 py-4 items-center font-bold' onClick={handleLinkClick}><span className='mr-2 pr-1'><FaChartBar size={20} /></span> <p>Reports</p></Link></li>
        <li><Link to='/manage' className='flex hover-effect-01 ml-4 py-4 items-center font-bold' onClick={handleLinkClick}><span className='mr-2 pr-1'><PiToolboxFill size={22} /></span> <p>Manage</p></Link></li>
        <li><Link to='/settings' className='flex hover-effect-01 ml-4 py-4 items-center font-bold' onClick={handleLinkClick}><span className='mr-2 pr-1'><RiFolderSettingsFill size={22} /></span> <p>Setting</p></Link></li>
      </ul>
    </div>
  );
};

export default Navigate;