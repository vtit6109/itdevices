import React from 'react';
import { useUserData } from '../../hooks/useDataFetching';

const UsersTable: React.FC = () => {
  const { users, status } = useUserData();

  if (status === 'loading') return <div>Loading users...</div>;
  if (status === 'failed') return <div>Error loading users</div>;

  return (
    <div>
      <h2>Users Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.userEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;