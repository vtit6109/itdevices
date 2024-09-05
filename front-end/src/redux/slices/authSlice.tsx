import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  accountID: number;
  accountName: string;
  accountRole: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface ErrorResponse {
  message: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: localStorage.getItem('token'),
  status: 'idle',
  error: null,
};

const createAxiosInstance = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const login = createAsyncThunk<AuthResponse, { accountName: string; accountPass: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post<AuthResponse>('/itdevices/auth/login', credentials);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data?.message || 'Đăng nhập thất bại');
    }
  }
);

export const register = createAsyncThunk<AuthResponse, { accountName: string; accountPass: string; accountRole: string }>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post<AuthResponse>('/itdevices/auth/register', credentials);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data?.message || 'Đăng ký thất bại');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('Không tìm thấy token');
    }
    try {
      const decodedToken = jwtDecode<{ user: User }>(token);
      return { token, user: decodedToken.user };
    } catch {
      localStorage.removeItem('token');
      return rejectWithValue('Token không hợp lệ');
    }
  }
);

export const fetchAccount = createAsyncThunk<User>(
  'auth/fetchAccount',
  async (_, { rejectWithValue }) => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get<User>('/itdevices/auth/account');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data?.message || 'Lấy thông tin tài khoản thất bại');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.status = 'idle';
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        const decodedToken = jwtDecode<{ user: User }>(action.payload.token);
        state.user = decodedToken.user;
        state.accessToken = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        const decodedToken = jwtDecode<{ user: User }>(action.payload.token);
        state.user = decodedToken.user;
        state.accessToken = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(fetchAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccount.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;