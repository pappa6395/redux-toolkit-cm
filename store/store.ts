"use client"

import cartSlice from "@/slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        cart: cartSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>; //root guide to Store
export type AppDispatch = typeof store.dispatch; // to update the reducer state

export default store;