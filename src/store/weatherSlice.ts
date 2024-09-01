import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherData {
    display_name: string,
    lat: string,
    long: string,
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    rainIntensity: number;
    rainAccumulation: number;
    place_id: string;
}

interface WeatherState {
    currentWeather: WeatherData | null;
    weatherHistory: WeatherData[];
}

const initialState: WeatherState = {
    currentWeather: null,
    weatherHistory: [],
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCurrentWeather: (state, action: PayloadAction<WeatherData>) => {
            state.currentWeather = action.payload;

            // Add the current weather data to the history array
            if (state.weatherHistory.length >= 10) {
                state.weatherHistory.shift(); // Remove the oldest entry if we have 10 places already
            }
            const index = state.weatherHistory.findIndex(item => item?.place_id === action.payload.place_id);
            if (!(index > 0)) {
                state.weatherHistory.push(action.payload)
            }

        },
    },
});

export const { setCurrentWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
