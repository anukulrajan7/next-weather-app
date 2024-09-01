'use client';
import SearchBox from '@/components/autoSearch';
import React, { Suspense } from 'react';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import WeatherPage from '@/components/weatherInfo';
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between  my-7">
			<Provider store={store}>
				<Suspense fallback={<div>Loading search box...</div>}>
					<SearchBox />
					<WeatherPage />
				</Suspense>
			</Provider>
		</main>
	);
}
