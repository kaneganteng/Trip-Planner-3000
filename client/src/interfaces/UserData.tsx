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
export interface EventAPIResult {
    activities: {
        id: number;   
        name: string;
        description: string;
        geoCode: {
            latitude: number;
            longitude: number;
        };
        price: {
            amount: string,
            currencyCode: string,
        };
    }[];
}
export interface EventToDisplay{
    name: string;
    description: string;
    location: string;
    price: number;
    eventDate: string;
}
export interface Hotel {
    id: number;
    name: string;
    checkInDate: string;
    checkOutDate: string;
    price: number;
}
export interface UserData {
    id: number;
    username: string;
    email: string;
    flights: FlightToDisplay[];
    hotels: Hotel[];
    events: EventToDisplay[];
}