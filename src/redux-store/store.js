import {} from '@reduxjs/toolkit';

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux-store/user";

const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

export default store;
