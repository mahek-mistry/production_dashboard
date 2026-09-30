import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.email = action.payload.email;
    },

    loginFailure: state => {
      state.loading = false;
      state.isLoggedIn = false;
      state.email = null;
    },

    logout: state => {
      state.isLoggedIn = false;
      state.email = null;
      state.loading = false;
    },

    restoreSession: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.email = action.payload.email;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  restoreSession,
} = authSlice.actions;

export default authSlice.reducer;