import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { resetUserState } from '../slices/userSlice';
import { resetLaptopState } from '../slices/laptopSlice';
import { AppDispatch } from '../store';

const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetUserState());
    dispatch(resetLaptopState());
    navigate('/');
  };

  return handleLogout;
};

export default useLogout;