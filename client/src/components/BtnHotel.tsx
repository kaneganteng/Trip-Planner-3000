import React from 'react';
import { HotelAPIResult } from '../interfaces/HotelAPIResult';

type ButtonProps = {
  cityCode: string;
  onResults: (data: HotelAPIResult) => void;
};

const BtnHotel: React.FC<ButtonProps> = ({ cityCode, onResults }) => {
  const handleClick = async () => {
    const data = await searchHotelAPI();
    onResults(data);
  };

  const searchHotelAPI = async (): Promise<HotelAPIResult> => {
    try {
      // Make the API call to the backend to fetch hotel data by cityCode
      const response = await fetch(`/amadeus/hotels/${cityCode}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Invalid API response, check the network tab');
      }

      // Return data in the expected format
      return { data: data };
    } catch (err) {
      console.error('An error occurred:', err);
      // Return an empty array in case of error
      return { data: [] };
    }
  };

  return (
    <button onClick={handleClick}>
      Search Hotels
    </button>
  );
};

export default BtnHotel;
