// import React from 'react';
import './Home.css';

const Hotels = () => (
    <section className="search-section">
        <input type="text" placeholder="Destination" />
        <input type="date" placeholder="Check-in" />
        <input type="date" placeholder="Check-out" />
        <input type="number" placeholder="Rooms" />
        <button onClick={() => console.log("Searching Hotels...")}>Search</button>
    </section>
);

export default Hotels;
