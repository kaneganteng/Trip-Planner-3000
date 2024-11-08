import React from 'react';

type ButtonProps = {
  onResults: (data: any) => void;
};

const ApiSearchButton: React.FC<ButtonProps> = ({ onResults }) => {
  const handleClick = async () => {
    const data = await searchAPI();
    onResults(data);
  };

const searchAPI = async () => {
  try {
    const response1 = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=ORL&radius=5&radiusUnit=KM&hotelSource=ALL`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AMADEUS_CLIENT_KEY}`,
        },
      }
    );
    const data1 = await response1.json();
    if (!response1.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const response2 = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AMADEUS_CLIENT_KEY}`,
        },
      }
    );
    const data2 = await response2.json();
    if (!response2.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const response3 = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.API_KEY}`,
        },
      }
    );
    const data3 = await response3.json();
    if (!response3.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const response4 = await fetch(
      `https://test.api.amadeus.com/v1/shopping/activities`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.API_KEY}`,
        },
      }
    );
    const data4 = await response4.json();
    if (!response4.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    return {
      hotel: data1,
      flights: data2,
      coordinates: data3,
      events: data4,
    };

  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};

  return (
    <button onClick={handleClick}>
      Search API
    </button>
  );
};

export default ApiSearchButton;