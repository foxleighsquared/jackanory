import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null
} as { token: string | null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    setToken: (state, action) => {
      state.token = action.payload;
    }
  }
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
