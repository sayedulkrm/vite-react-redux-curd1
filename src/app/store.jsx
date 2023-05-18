import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../features/userSlice";

const store = configureStore({
    reducer: {
        users: userSliceReducer,
    },
});

export default store;
