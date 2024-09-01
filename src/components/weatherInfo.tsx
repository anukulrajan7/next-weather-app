import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCurrentWeather } from '../store/weatherSlice';
import { useSearchParams } from 'next/navigation';

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

	// Log the API key and endpoint for debugging
	useEffect(() => {
		console.log('API Key:', apiKey);
		console.log('Fetching Weather Data for:', {
			place_id,
			display_name,
			lat,
			long,
		});
	}, [apiKey, place_id, display_name, lat, long]);

	useEffect(() => {
		if (place_id && display_name && lat && long) {
			setLoading(true);
			const fetchWeather = async () => {
				try {
					const response = await fetch(
						`https://www.weatherunion.com/gw/weather/external/v0/get_weather_data?latitude=12.933756&longitude=77.625825`,
						{
							headers: {
								'X-Zomato-Api-Key': `${apiKey}`,
							},
						}
					);

					if (!response.ok) {
						console.error('Failed to fetch weather data:', response.statusText);
						return;
					}

					const data = await response.json();
					dispatch(setCurrentWeather({ place_id, display_name, ...data }));
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
		<div>
			<h1>Weather Data for Locality: {display_name}</h1>
			{/* Render weather data here */}
			{loading ? (
				<p>Loading...</p>
			) : currentWeather ? (
				<pre>{JSON.stringify(currentWeather, null, 2)}</pre>
			) : (
				<p>No weather data available.</p>
			)}
		</div>
	);
};

export default WeatherPage;
