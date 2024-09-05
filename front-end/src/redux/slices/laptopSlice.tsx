import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface Laptop {
  laptopID: string;
  laptopName: string;
  toolNumber: string;
  purchaseCode: string;
  brandID: number;
  modelID: number;
  categoryID: number;
  stateID: number;
  userID: number;
  changesComponentsID: number;
  handoverID: number;
  userName: string;
  modelName: string;
  categoryName: string;
  stateName: string;
  brandName: string;
  changesComponentsTitle: string;
  handoverTitle: string;
}

interface LaptopState {
  laptops: Laptop[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LaptopState = {
  laptops: [],
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

export const fetchLaptops = createAsyncThunk<Laptop[], void, { rejectValue: string }>(
  'laptops/fetchLaptops',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get<Laptop[]>('/itdevices/laptops', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Lấy dữ liệu laptop thất bại');
    }
  }
);

export const fetchLaptopById = createAsyncThunk<Laptop, string, { rejectValue: string }>(
  'laptops/fetchLaptopById',
  async (laptopID, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get<Laptop>(`/itdevices/laptops/${laptopID}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Lấy dữ liệu laptop thất bại');
    }
  }
);

export const createLaptop = createAsyncThunk<Laptop, Omit<Laptop, 'laptopID'>, { rejectValue: string }>(
  'laptops/createLaptop',
  async (laptopData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post<Laptop>('/itdevices/laptops', laptopData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Tạo laptop thất bại');
    }
  }
);

export const updateLaptop = createAsyncThunk<Laptop, { laptopID: string, laptopData: Partial<Laptop> }, { rejectValue: string }>(
  'laptops/updateLaptop',
  async ({ laptopID, laptopData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.put<Laptop>(`/itdevices/laptops/${laptopID}`, laptopData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Cập nhật laptop thất bại');
    }
  }
);

export const deleteLaptop = createAsyncThunk<string, string, { rejectValue: string }>(
  'laptops/deleteLaptop',
  async (laptopID, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const axiosInstance = createAxiosInstance();
      await axiosInstance.delete(`/itdevices/laptops/${laptopID}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return laptopID;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || 'Xóa laptop thất bại');
    }
  }
);

const laptopSlice = createSlice({
  name: 'laptops',
  initialState,
  reducers: {
    resetLaptopState: (state) => {
      state.laptops = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaptops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLaptops.fulfilled, (state, action: PayloadAction<Laptop[]>) => {
        state.status = 'succeeded';
        state.laptops = action.payload;
      })
      .addCase(fetchLaptops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchLaptopById.fulfilled, (state, action: PayloadAction<Laptop>) => {
        const index = state.laptops.findIndex(laptop => laptop.laptopID === action.payload.laptopID);
        if (index !== -1) {
          state.laptops[index] = action.payload;
        } else {
          state.laptops.push(action.payload);
        }
      })
      .addCase(createLaptop.fulfilled, (state, action: PayloadAction<Laptop>) => {
        state.laptops.push(action.payload);
      })
      .addCase(updateLaptop.fulfilled, (state, action: PayloadAction<Laptop>) => {
        const index = state.laptops.findIndex(laptop => laptop.laptopID === action.payload.laptopID);
        if (index !== -1) {
          state.laptops[index] = action.payload;
        }
      })
      .addCase(deleteLaptop.fulfilled, (state, action: PayloadAction<string>) => {
        state.laptops = state.laptops.filter(laptop => laptop.laptopID !== action.payload);
      });
  },
});

export const { resetLaptopState } = laptopSlice.actions;
export default laptopSlice.reducer;