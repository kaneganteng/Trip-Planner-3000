import React from 'react';
import type { UserData } from "../interfaces/UserData";
import auth from '../utils/auth';

// Define the props for the component
interface UserListProps {
    users: UserData[] | null; // users can be an array of UserData objects or null
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    const userProfile = auth.getProfile();

    return (
        <>
            <h2 className="pb-5">
                Hey {userProfile?.username || 'Guest'}, check out the list of your prefereces!
            </h2>
            {users && users.map((user) => (
                <div className="user-section mb-5" key={user.id}>
                    <h3>{user.id}. {user.username}</h3>
                    <h4>Email: <a href={`mailto:${user.email}`}>{user.email}</a></h4>

                    {/* List Flights */}
                    <div className="flights-section">
                        <h5>Flights</h5>
                        {user.flights.length > 0 ? (
                            user.flights.map(flight => (
                                <div key={flight.id} className="flight-item">
                                    <p>Destination: {flight.destination}</p>
                                    <p>Departure Date: {new Date(flight.departureDate).toLocaleDateString()}</p>
                                    <p>Return Date: {new Date(flight.returnDate).toLocaleDateString()}</p>
                                    <p>Price: ${flight.price}</p>
                                </div>
                            ))
                        ) : (
                            <p>No flights available.</p>
                        )}
                    </div>

                    {/* List Hotels */}
                    <div className="hotels-section">
                        <h5>Hotels</h5>
                        {user.hotels.length > 0 ? (
                            user.hotels.map(hotel => (
                                <div key={hotel.id} className="hotel-item">
                                    <p>Name: {hotel.name}</p>
                                    <p>Check-In Date: {new Date(hotel.checkInDate).toLocaleDateString()}</p>
                                    <p>Check-Out Date: {new Date(hotel.checkOutDate).toLocaleDateString()}</p>
                                    <p>Price: ${hotel.price} per night</p>
                                </div>
                            ))
                        ) : (
                            <p>No hotels available.</p>
                        )}
                    </div>

                    {/* List Events */}
                    <div className="events-section">
                        <h5>Local Events</h5>
                        {user.events.length > 0 ? (
                            user.events.map(event => (
                                <div key={event.id} className="event-item">
                                    <p>Event: {event.name}</p>
                                    <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                                    <p>Location: {event.location}</p>
                                    <p>Description: {event.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No events available.</p>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default UserList;
