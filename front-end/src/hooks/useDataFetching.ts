import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUsers } from '../redux/slices/userSlice';
import { fetchLaptops } from '../redux/slices/laptopSlice';
import { fetchAccount } from '../redux/slices/authSlice';

export const useDataFetching = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const laptops = useSelector((state: RootState) => state.laptops.laptops);
  const userStatus = useSelector((state: RootState) => state.users.status);
  const laptopStatus = useSelector((state: RootState) => state.laptops.status);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const account = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (isAuthenticated) {
      if (userStatus === 'idle') {
        dispatch(fetchUsers());
      }
      if (laptopStatus === 'idle') {
        dispatch(fetchLaptops());
      }
      dispatch(fetchAccount());
    }
  }, [userStatus, laptopStatus, isAuthenticated, dispatch]);

  return { users, laptops, userStatus, laptopStatus, account };
};