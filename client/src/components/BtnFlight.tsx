import React from 'react';
import { FlightAPIResult } from '../interfaces/UserData';

type ButtonProps = {
  flyingFrom: string;
  to: string;
  departing: string;
  returning: string;
  adults: number

  onResults: (data: FlightAPIResult
  ) => void;
};

const BtnFlight: React.FC<ButtonProps> = ({ 
  flyingFrom, 
  to, 
  departing, 
  returning, 
  adults,
  onResults }) => {
  const handleClick = async () => {
    const data = await searchAPI() as FlightAPIResult;
    onResults(data);
  };
  const searchAPI = async () => {
    try {
      const response2 = await fetch(
        `/amadeus/shopping/flight-offers?originLocationCode=${flyingFrom}&destinationLocationCode=${to}&departureDate=${departing}&adults=${adults}&returnDate=${returning}`
       
      );
      const data2 = await response2.json();
      if (!response2.ok) {
        throw new Error('Invalid API response, check the network tab');
      }

      return {
        flights: data2,
      };
    } catch (err) {
      console.error('An error occurred:', err);
      return [];
    }
  };
  return (
    <button onClick={handleClick}>
      Search Flight
    </button>
  );
};
export default BtnFlight;