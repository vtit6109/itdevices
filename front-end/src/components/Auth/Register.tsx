import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../redux/store';

const Register: React.FC = () => {
  const [accountName, setAccountName] = useState('');
  const [accountPass, setAccountPass] = useState('');
  const [accountRole, setAccountRole] = useState('user');
  const dispatch: AppDispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ accountName, accountPass, accountRole }));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={accountPass} onChange={(e) => setAccountPass(e.target.value)} />
        </div>
        <div>
          <label>Role:</label>
          <select value={accountRole} onChange={(e) => setAccountRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
