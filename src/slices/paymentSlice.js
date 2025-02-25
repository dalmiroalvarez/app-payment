import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPayment = createAsyncThunk(
  'payment/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://api.testnet/payment/orders', paymentData, {
        headers: {
          'X-Device-Id': 'a5765a1e-207f-42d8-a98a-d5df59cc2d66',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    payment: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.payment = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;