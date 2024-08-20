import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUsers } from '../redux/slices/userSlice';
import { fetchLaptops } from '../redux/slices/laptopSlice';

export const useUserData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const status = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  return { users, status };
};

export const useLaptopData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const laptops = useSelector((state: RootState) => state.laptops.laptops);
  const status = useSelector((state: RootState) => state.laptops.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLaptops());
    }
  }, [status, dispatch]);

  return { laptops, status };
};