import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // Stores user information
    isAuthenticated: false, // Tracks if the user is logged in
    loading: false, // Tracks loading state for user actions
    error: null, // Stores any error messages
    token: null, // Stores authentication token
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.token = action.payload.access_token; // Assuming the token is part of the payload
            localStorage.setItem('token', action.payload.access_token); // Store token in local storage
            
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
        clearError(state) {
            state.error = null;
        },
        addUserDetails(state, action) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            } else {
                state.user = action.payload;
            }
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    clearError,
    addUserDetails,
} = userSlice.actions;

export default userSlice.reducer;