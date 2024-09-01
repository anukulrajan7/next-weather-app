'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setQuery,
	setSuggestions,
	setSelectedPlace,
} from '../store/locationSlice';
import { RootState } from '../store/store';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchBox = () => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const apiKey = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;

	const { query, suggestions } = useSelector(
		(state: RootState) => state.location
	);

	// State to hold the debounce timer
	const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
		null
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSuggestions([]));
		const value = e.target.value;
		dispatch(setQuery(value));

		if (debounceTimer) {
			clearTimeout(debounceTimer); // Clear the previous timer if it exists
		}

		if (value.length > 0) {
			setLoading(true); // Start loading animation
			setError(null); // Clear previous errors

			const newTimer = setTimeout(async () => {
				try {
					const response = await fetch(
						`https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${value}&limit=5`
					);
					if (!response.ok) {
						throw new Error('Failed to fetch suggestions');
					}
					const data = await response.json();
					dispatch(setSuggestions(data));
				} catch (error) {
					setError('Error fetching suggestions. Please try again.');
					dispatch(setSuggestions([]));
				} finally {
					setLoading(false); // Stop loading animation
				}
			}, 1000);

			setDebounceTimer(newTimer); // Set the new timer
		} else {
			dispatch(setSuggestions([]));
			setLoading(false); // Clear suggestions if input is empty
		}
	};

	const handleSuggestionClick = (suggestion: any) => {
		dispatch(
			setSelectedPlace({
				place_id: suggestion.place_id,
				display_name: suggestion.display_name,
				lat: suggestion.lat,
				long: suggestion.lon,
			})
		);
		dispatch(setQuery(suggestion.display_name));

		// Create a new instance of URLSearchParams
		const params = new URLSearchParams(searchParams.toString());

		// Update the search parameters
		params.set('place_id', suggestion.place_id);
		params.set('display_name', suggestion.display_name);
		params.set('lat', suggestion.lat);
		params.set('long', suggestion.lon);

		// Use router.push to update the URL without a page reload
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="relative w-[70%] p-2">
			<div className="w-full flex">
				<input
					type="text"
					value={query}
					onChange={handleInputChange}
					placeholder="Search for a locality..."
					className="p-3 border rounded w-full text-black placeholder:text-gray-600 outline-none"
				/>
			</div>
			{loading ? (
				<div className="absolute w-full flex justify-center items-center mt-1 z-10">
					..... fetching
				</div>
			) : error ? (
				<div
					className="absolute w-full mt-1 z-10 bg-red-600 text-white p-2 rounded"
					onClick={() => {
						setError(null);
					}}
				>
					{error}
				</div>
			) : (
				query &&
				suggestions.length > 0 && (
					<ul
						className="absolute bg-purple-600 border rounded w-[99%] mt-1 z-10"
						onClick={() => dispatch(setSuggestions([]))}
					>
						{suggestions.length > 0 &&
							suggestions.map((suggestion, index) => (
								<li
									key={index}
									className="p-2 cursor-pointer hover:bg-gray-400 text-white"
									onClick={() => handleSuggestionClick(suggestion)}
								>
									{suggestion.display_name}
								</li>
							))}
					</ul>
				)
			)}
		</div>
	);
};

export default SearchBox;
