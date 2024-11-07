// import React from 'react';
import './Home.css';

const LocalEvents = () => (
    <section className="search-section">
        <input type="text" placeholder="Location" />
        <input type="date" placeholder="Date" />
        <input type="number" placeholder="Tickets" />
        <button onClick={() => console.log("Searching Local Events...")}>Search</button>
    </section>
);

export default LocalEvents;
