import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const fetchLaptops = createAsyncThunk('laptops/fetchLaptops', async () => {
  const response = await axios.get('/itdevices/laptops');
  return response.data;
});

export const fetchLaptopById = createAsyncThunk('laptops/fetchLaptopById', async (laptopID: string) => {
  const response = await axios.get(`/itdevices/laptops/${laptopID}`);
  return response.data;
});

export const createLaptop = createAsyncThunk('laptops/createLaptop', async (laptopData: Omit<Laptop, 'laptopID'>) => {
  const response = await axios.post('/itdevices/laptops', laptopData);
  return response.data;
});

export const updateLaptop = createAsyncThunk('laptops/updateLaptop', async ({ laptopID, laptopData }: { laptopID: string, laptopData: Partial<Laptop> }) => {
  const response = await axios.put(`/itdevices/laptops/${laptopID}`, laptopData);
  return response.data;
});

export const deleteLaptop = createAsyncThunk('laptops/deleteLaptop', async (laptopID: string) => {
  await axios.delete(`/itdevices/laptops/${laptopID}`);
  return laptopID;
});

const laptopSlice = createSlice({
  name: 'laptops',
  initialState,
  reducers: {},
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
        state.error = action.error.message || null;
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

export default laptopSlice.reducer;