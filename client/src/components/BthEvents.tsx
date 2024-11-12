import React from 'react';
import { EventAPIResult } from '../interfaces/UserData';

type ButtonProps = {
  location: string;
  eventDate: string;
  price: number | string;
  
  onResults: (data: EventAPIResult
    ) => void;
};

const BtnEvent: React.FC<ButtonProps> = ({ 
  location = '',
  eventDate = '',
  price = '',
  onResults }) => {
    console.log('Props:', { location, eventDate, price }); 
    
    const handleClick = async () => {
    try {
      const data = await searchAPI();
      onResults(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      alert('An error occurred while searching for local events. Please try again later.');
    }
  };
const searchAPI = async () => {
  try {
    const query: string = new URLSearchParams({
      city: location || '',
      radius: '10', // Default radius, you can make it dynamic if needed
      max: '10',    // Default max, you can adjust it
      price: price? Number(price).toString():''
    }).toString();
    console.log('Query string:', query);

    const response = await fetch(
      `/amadeus/shopping/activities?query${query}`,
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    return {
     activities: data.data,
    };

  } catch (err) {
    console.error('An error occurred:', err);
    return {activities: []};
  }
};
  return (
    <button onClick={handleClick}>
      Search Local Event
    </button>
  );
};
export default BtnEvent;