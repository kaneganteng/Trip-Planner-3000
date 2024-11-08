import { FlightAPIResult, FlightToDisplay } from '../interfaces/LiciaInterfaceUserData';
import React, { useState } from 'react';
import BtnFlight from '../components/BtnFlight';
import './Home.css';


const Flights = () => {
    // State to hold input values
    const [flyingFrom, setFlyingFrom] = useState('');
    const [to, setTo] = useState('');
    const [departing, setDeparting] = useState('');
    const [returning, setReturning] = useState('');
    const [adults, setAdults] = useState<number>(0);
    const [flightsToDisplay, setFlightsToDisplay] = useState<FlightToDisplay[]>([]); // State to store results

    // Callback to handle flight results
    const handleFlightResults = (data: FlightAPIResult) => {
        console.log(data);
        const flights = [] as FlightToDisplay[];
        // for loop
        for (let i = 0; i < data.flights.length; i++) {
            const flight = {
                from: flyingFrom,
                destination: to,
                departureDate: departing,
                returnDate: returning,
                numberOfPeople: adults,
                price: data.flights[i].price.grandTotal
            }
            flights.push(flight);
        }
        console.log(flights);
        setFlightsToDisplay(flights);
    };


    return (
        <section className="search-section">
            <input
                type="text"
                placeholder="Flying From"
                value={flyingFrom}
                onChange={(e) => setFlyingFrom(e.target.value)}
            />
            <input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />
            <input
                type="date"
                placeholder="Departing"
                value={departing}
                onChange={(e) => setDeparting(e.target.value)}
            />
            <input
                type="date"
                placeholder="Returning"
                value={returning}
                onChange={(e) => setReturning(e.target.value)}
            />
            <input
                type="number"
                placeholder="Adults"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
            />
            <BtnFlight 
            flyingFrom={flyingFrom}
            to={to}
            departing={departing} 
            returning={returning}
            adults={adults}
            onResults={handleFlightResults} />

            {flightsToDisplay && (
                <div>
                    <h3>Flight Results: </h3>
                    {/* {flightsToDisplay.map(f => 
                    <li>{f.price}</li>
                    )} */}
                    <pre>{JSON.stringify(flightsToDisplay, null, 2)}</pre>
                </div>
            )}
        </section>
    );
};

export default Flights;
