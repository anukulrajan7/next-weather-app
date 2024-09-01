import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCurrentWeather } from '../store/weatherSlice';
import { useSearchParams } from 'next/navigation';
import WeatherCard from './weatherCard';

const WeatherPage = () => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const place_id = searchParams.get('place_id');
	const display_name = searchParams.get('display_name');
	const lat = searchParams.get('lat');
	const long = searchParams.get('long'); // Note: Corrected 'logn' to 'long'
	const apiKey = process.env.NEXT_PUBLIC_ZOMATO_API_KEY;
	const { currentWeather } = useSelector((state: RootState) => state.weather);

	useEffect(() => {
		if (place_id && display_name && lat && long) {
			setLoading(true);
			const url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${long}`;
			const options: any = {
				method: 'GET',
				headers: {
					'x-rapidapi-key': apiKey,
					'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
				},
			};
			const fetchWeather = async () => {
				try {
					const response = await fetch(url, options);

					if (!response.ok) {
						console.error('Failed to fetch weather data:', response.statusText);
						return;
					}

					const data = await response.json();
					if (data) {
						const weatherData = {
							temperature: data.main.temp,
							humidity: data.main.humidity,
							windSpeed: data.wind.speed,
							windDirection: data.wind.deg,
							rainIntensity: data.rain ? data.rain['1h'] || 0 : 0, // Rain data may not be present
							rainAccumulation: data.rain ? data.rain['24h'] || 0 : 0, // Rain data may not be present
						};
						dispatch(
							setCurrentWeather({
								place_id,
								display_name,
								lat,
								long,
								...weatherData,
							})
						);
					}
				} catch (error) {
					console.error('Error fetching weather data:', error);
				} finally {
					setLoading(false);
				}
			};

			fetchWeather();
		}
	}, [lat, long]);

	return (
		<div className="flex flex-col items-center gap-2">
			<h1 className="font-serif bg-teal-100 text-green-700 px-7 py-1 text-lg font-semibold italic shadow-sm rounded-md">
				{' '}
				{display_name}
			</h1>

			{loading ? (
				<p>Loading...</p>
			) : currentWeather ? (
				<WeatherCard currentWeather={currentWeather}></WeatherCard>
			) : (
				<p>No weather data available.</p>
			)}
		</div>
	);
};

export default WeatherPage;
