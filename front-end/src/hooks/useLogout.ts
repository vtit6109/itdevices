import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { resetUserState } from '../redux/slices/userSlice';
import { resetLaptopState } from '../redux/slices/laptopSlice';
import { AppDispatch } from '../redux/store';

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