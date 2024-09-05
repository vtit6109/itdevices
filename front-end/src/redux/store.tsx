import { configureStore } from '@reduxjs/toolkit';
import userReducer  from './slices/userSlice.tsx';
import laptopReducer from './slices/laptopSlice.tsx'; 
import authReducer from './slices/authSlice.tsx'
const store = configureStore({
  reducer: {
    users: userReducer,
    laptops: laptopReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
