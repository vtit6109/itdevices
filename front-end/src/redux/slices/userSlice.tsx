import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

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

// Hàm helper để tạo axios instance
const createAxiosInstance = () => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Tạo async thunk để lấy tất cả users
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get<User[]>('/itdevices/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Lấy dữ liệu người dùng thất bại');
    }
  }
);

// Tạo async thunk để lấy user theo ID
export const fetchUserById = createAsyncThunk<User, number, { rejectValue: string }>(
  'users/fetchUserById',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get<User>(`/itdevices/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Lấy dữ liệu người dùng thất bại');
    }
  }
);

// Tạo async thunk để tạo user mới
export const createUser = createAsyncThunk<User, Omit<User, 'id'>, { rejectValue: string }>(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post<User>('/itdevices/users', userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Tạo người dùng thất bại');
    }
  }
);

// Tạo async thunk để cập nhật user
export const updateUser = createAsyncThunk<User, { id: number, userData: Partial<User> }, { rejectValue: string }>(
  'users/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.put<User>(`/itdevices/users/${id}`, userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Cập nhật người dùng thất bại');
    }
  }
);

// Tạo async thunk để xóa user
export const deleteUser = createAsyncThunk<number, number, { rejectValue: string }>(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const axiosInstance = createAxiosInstance();
      await axiosInstance.delete(`/itdevices/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Xóa người dùng thất bại');
    }
  }
);

// Tạo slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUserState: (state) => {
        state.users = [];
        state.status = 'idle';
        state.error = null;
      },
    },
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
        state.error = action.payload as string;
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

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;