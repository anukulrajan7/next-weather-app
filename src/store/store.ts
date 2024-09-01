import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import weatherReducer from './weatherSlice';

export const store = configureStore({
    reducer: {
        location: locationReducer,
        weather: weatherReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
