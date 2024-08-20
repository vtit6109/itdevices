import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho User
interface User {
  id: number;
  userName: string;
  userEmail: string;
  deptID: number;
  postID: number;
  deptName: string;
  postName: string;
}

// Định nghĩa kiểu dữ liệu cho state
interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Khởi tạo state
const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
};

// Tạo async thunk để lấy tất cả users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/itdevices/users');
  return response.data;
});

// Tạo async thunk để lấy user theo ID
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: number) => {
  const response = await axios.get(`/itdevices/users/${id}`);
  return response.data;
});

// Tạo async thunk để tạo user mới
export const createUser = createAsyncThunk('users/createUser', async (userData: Omit<User, 'id'>) => {
  const response = await axios.post('/itdevices/users', userData);
  return response.data;
});

// Tạo async thunk để cập nhật user
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }: { id: number, userData: Partial<User> }) => {
  const response = await axios.put(`/itdevices/users/${id}`, userData);
  return response.data;
});

// Tạo async thunk để xóa user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  await axios.delete(`/itdevices/users/${id}`);
  return id;
});

// Tạo slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        } else {
          state.users.push(action.payload);
        }
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;