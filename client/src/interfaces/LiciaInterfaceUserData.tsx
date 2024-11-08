export interface FlightAPIResult {
    flights: {
        id: number;
        numberOfBookableSeats: number;
        itineraries: {
            segments: {
                departure: {
                    at: string;
                }

            }[];
        }[];

        price: {
            grandTotal: string;
        };
    }[];
}
export interface FlightToDisplay {
    from: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    numberOfPeople: number;
    price: string;
}
export interface Hotel {
    id: number;
    name: string;
    checkInDate: string;
    checkOutDate: string;
    price: number;
}
export interface Event {
    id: number;
    name: string;
    eventDate: string;
    location: string;
    description: string;
}
export interface UserData {
    id: number;
    username: string;
    email: string;
    flights: FlightToDisplay[];
    hotels: Hotel[];
    events: Event[];
}