import React from 'react';
type ButtonProps = {
  onResults: (data: never[] | {
    hotel: unknown;
    // flights: unknown;
    // activities: unknown;
    }) => void;
};
const BtnHotel: React.FC<ButtonProps> = ({ onResults }) => {
  const handleClick = async () => {
    const data = await searchAPI();
    onResults(data);
  };
const searchAPI = async () => {
  try {
    const response1 = await fetch(
      `/amadeus/hotels/PAR/`,
    );
    const data1 = await response1.json();
    if (!response1.ok) {
      throw new Error('Invalid API response, check the network tab');
    }
    // const response2 = await fetch(
    //   `/amadeus/shopping/flight-offers/`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${import.meta.env.VITE_AMADEUS_CLIENT_KEY}`,
    //     },
    //   }
    // );
    // const data2 = await response2.json();
    // if (!response2.ok) {
    //   throw new Error('Invalid API response, check the network tab');
    // }
    
    // const response4 = await fetch(
    //   `https://test.api.amadeus.com/v1/shopping/activities`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${import.meta.env.API_KEY}`,
    //     },
    //   }
    // );
    // const data4 = await response4.json();
    // if (!response4.ok) {
    //   throw new Error('Invalid API response, check the network tab');
    // }
    return {
      hotel: data1,
      // flights: data2,
      // activities: data4,
    };
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};
  return (
    <button onClick={handleClick}>
      Hotel API
    </button>
  );
};
export default BtnHotel;