import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/CardInfo';
import { FaUsers } from 'react-icons/fa'; 
import { GiLaptop, GiCctvCamera } from "react-icons/gi";
import { BsQrCodeScan } from "react-icons/bs";
import { useDataFetching } from '../hooks/useDataFetching';
import { Spin } from 'antd'; 

const Dashboard: React.FC = () => {
  const { users, laptops, userStatus, laptopStatus } = useDataFetching();

  if (userStatus === 'loading' || laptopStatus === 'loading') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <li>
          <Link to="/tables/users">
            <Card 
              title="Users" 
              value={users.length} 
              icon={<FaUsers size={40} style={{color:'#ebae2d'}} />}
              backcolor='bg-white'
            />
          </Link>
        </li>
        <li>
          <Link to="/tables/laptops">
            <Card 
              title="Laptops" 
              value={laptops.length} 
              icon={<GiLaptop size={40} style={{color:'#2da5eb'}} />}
              backcolor='bg-white'
            />
          </Link>
        </li>
        <li>
           <Card 
             title="CCTV" 
             value={0} 
             icon={<GiCctvCamera size={40} style={{color:'#eb2d9f'}} />}
             backcolor='bg-white'
           />
         </li>
         <li>
           <Card 
             title="PDA" 
             value={0} 
             icon={<BsQrCodeScan size={40} style={{color:'#4eba69'}} />}
             backcolor='bg-white'
           />
         </li>
      </ul>
    </div>
  );
};

export default Dashboard;
