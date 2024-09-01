import { FC } from 'react';
import { FaThermometerHalf, FaWind, FaMapMarkerAlt } from 'react-icons/fa';
import { FaDroplet } from 'react-icons/fa6';

export interface WeatherData {
	temperature: number;
	humidity: number;
	windSpeed: number;
	windDirection: number;
	rainIntensity: number;
	rainAccumulation: number;
	place_id: string;
	lat: string; // Added lat
	long: string; // Added long
}

export interface WeatherCardProps {
	currentWeather: WeatherData;
}

const kelvinToCelsius = (kelvin: number): number => kelvin - 273.15;
const mpsToKmph = (mps: number): number => mps * 3.6;

const WeatherCard: FC<WeatherCardProps> = ({ currentWeather }) => {
	return (
		<div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="p-3 text-purple-700 text-[.925rem]">
				<div className="flex items-center mb-4 justify-center">
					<FaMapMarkerAlt className="text-purple-700 mr-2" />
					<p className="text-[.925rem] font-serif font-semibold text-purple-700">
						Location
					</p>
				</div>
				<div className="text-gray-700 flex gap-2">
					<p className="mb-2 text-[.925rem]">
						<strong>Latitude:</strong> {currentWeather.lat}
					</p>
					<p className="mb-2 text-[.925rem]">
						<strong>Longitude:</strong> {currentWeather.long}
					</p>
				</div>
				<div className="flex justify-center gap-2 items-center">
					<div className="flex items-center mb-4">
						<FaThermometerHalf className="text-red-500" />
						<p className="text-[.925rem] font-serif font-semibold">
							Temperature
						</p>
					</div>
					<div className="text-gray-700 mb-4">
						<p>{kelvinToCelsius(currentWeather.temperature).toFixed(1)} °C</p>
					</div>
				</div>
				<div className="flex justify-center gap-2 items-center">
					<div className="flex items-center mb-4">
						<FaDroplet className="text-blue-500 mr-2" />
						<p className="text-[.925rem] font-serif font-semibold">Humidity</p>
					</div>
					<div className="text-gray-700 mb-4">
						<p>{currentWeather.humidity} %</p>
					</div>
				</div>
				<div className="flex justify-center gap-2 items-center">
					<div className="flex items-center mb-4">
						<FaWind className="text-green-500 mr-2" />
						<p className="text-[.925rem] font-serif font-semibold">
							Wind Speed
						</p>
					</div>
					<div className="text-gray-700 mb-4">
						<p>{mpsToKmph(currentWeather.windSpeed).toFixed(1)} km/h</p>
					</div>
				</div>
				<div className="flex justify-center gap-2 items-center">
					<div className="flex items-center mb-4">
						<FaDroplet className="text-blue-300 mr-2" />
						<p className="text-[.925rem] font-serif font-semibold">
							Rain Intensity
						</p>
					</div>
					<div className="text-gray-700 mb-4">
						<p>{currentWeather.rainIntensity} mm</p>
					</div>
				</div>
				<div className="flex justify-center gap-2 items-center">
					<div className="flex items-center mb-4">
						<FaDroplet className="text-blue-300 mr-2" />
						<p className="text-[.925rem] font-serif font-semibold">
							Rain Accumulation
						</p>
					</div>
					<div className="text-gray-700 mb-4">
						<p>{currentWeather.rainAccumulation} mm</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
