import React from 'react';
import { useLaptopData } from '../../hooks/useDataFetching';

const LaptopsTable: React.FC = () => {
  const { laptops, status } = useLaptopData();

  if (status === 'loading') return <div>Loading laptops...</div>;
  if (status === 'failed') return <div>Error loading laptops</div>;

  return (
    <div>
      <h2>Laptops Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Model</th>
          </tr>
        </thead>
        <tbody>
          {laptops.map(laptop => (
            <tr key={laptop.laptopID}>
              <td>{laptop.laptopID}</td>
              <td>{laptop.laptopName}</td>
              <td>{laptop.modelName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaptopsTable;