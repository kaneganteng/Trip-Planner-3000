import { useState } from 'react';
import { EventAPIResult, EventToDisplay } from '../interfaces/UserData';
import BtnEvent from '../components/BthEvents';
import './Home.css';

const Events = () => {
    //State to hold input values
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventsToDisplay, setEventsToDisplay] = useState<EventToDisplay[]>([]); // State to store result

    // Callback to handle flight results
    const handleEventResults = (data: EventAPIResult) => {
        console.log(data);
        const events = data.activities.map((item) => {
            return {
                name: item.name,
                description: item.description,
                location: `${item.geoCode.latitude}, ${item.geoCode.longitude}`,
                price: parseFloat(item.price.amount),
                eventDate: eventDate || 'N/A',
            };
        });
        console.log(events);
        setEventsToDisplay(events);
    };

    return(
    <section className="search-section">
        <input 
            type="text" 
            placeholder="Location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
        />
        <input 
            type="date" 
            placeholder="Date" 
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
        />
        <input 
        type="number" 
        placeholder="Price" 
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />
        {/* <button onClick={() => console.log("Searching Local Events...")}>Search</button> */}
        <BtnEvent 
            location={location}
            eventDate={eventDate}
            price={Number(price) || 0} 
            onResults={handleEventResults} // Corrected spelling
/>
            {eventsToDisplay && (
                <div>
                    <h3>Event Results: </h3>
                    <ul>
                        {eventsToDisplay.map((event, index) => (
                            <li key={index}>
                                <strong>{event.name}</strong>: {event.description} | Location: {event.location} | Price: {event.price} USD
                            </li>
                        ))}
                    </ul>
                </div>
            )}
    </section>
);
}
export default Events;
