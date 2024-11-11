import React, { useState } from 'react';
import BtnHotel from '../components/BtnHotel';
import { HotelAPIResult } from '../interfaces/HotelAPIResult';
import './Home.css';

const Hotels: React.FC = () => {
  const [cityCode, setCityCode] = useState('');
  const [hotelResults, setHotelResults] = useState<HotelAPIResult | null>(null);

  // Handle city code input change
  const handleCityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityCode(e.target.value.toUpperCase()); // Ensure uppercase for city code
  };

  // Handle hotel search results
  const handleResults = (data: HotelAPIResult) => {
    setHotelResults(data);
  };

  return (
    <section className="search-section">
      <input
        type="text"
        placeholder="City Code (e.g., NYC)"
        value={cityCode}
        onChange={handleCityCodeChange}
      />
      <BtnHotel cityCode={cityCode} onResults={handleResults} />
      
      {hotelResults && hotelResults.data.length > 0 ? (
        <div className="hotel-results">
          {hotelResults.data.map((hotel, index) => (
            <div key={index} className="hotel-card">
              <h3>{hotel.name}</h3>
              <p>ID: {hotel.hotelId}</p>
              <p>Location: {hotel.iataCode}</p>
              <p>Country: {hotel.address.countryCode}</p>
              <p>Last Updated: {hotel.lastUpdate}</p>
              <p>Coordinates: {hotel.geoCode.latitude}, {hotel.geoCode.longitude}</p>
            </div>
          ))}
        </div>
      ) : (
        hotelResults && <p>No hotels found for this city code.</p>
      )}
    </section>
  );
};

export default Hotels;
