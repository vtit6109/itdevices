import React from 'react';
import '../index.css'
interface CardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  backcolor: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, backcolor }) => {
  return (
    <div className={`w-full mb-6 h-28 hover-effect-02 cursor-pointer p-4 text-center rounded-lg border-2 ${backcolor}`}>
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <div className='text-gray-500 text-sm mt-1 font-semibold'>
        <h3 className="">{title}</h3>
        <p className="card-value">{value}</p>
      </div>
    </div>
  );
};

export default Card;
