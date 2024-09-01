import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
    query: string;
    suggestions: any[];
    selectedPlace: {
        place_id: string;
        display_name: string;
        lat: string,
        long: string
    } | null;
}

const initialState: LocationState = {
    query: '',
    suggestions: [],
    selectedPlace: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setSuggestions: (state, action: PayloadAction<any[]>) => {
            state.suggestions = action.payload;
        },
        setSelectedPlace: (state, action: PayloadAction<{ place_id: string; display_name: string, lat: string, long: string }>) => {
            state.selectedPlace = action.payload;
        },
    },
});

export const { setQuery, setSuggestions, setSelectedPlace } = locationSlice.actions;

export default locationSlice.reducer;
