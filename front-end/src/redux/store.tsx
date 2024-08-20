import { configureStore } from '@reduxjs/toolkit';
import userReducer  from './slices/userSlice.tsx';
import laptopReducer from './slices/laptopSlice.tsx'; 
const store = configureStore({
  reducer: {
    users: userReducer,
    laptops: laptopReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
