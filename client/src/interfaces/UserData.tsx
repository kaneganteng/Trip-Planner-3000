export interface Flight {
  id: number;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  number
  price: number;
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
  flights: Flight[];
  hotels: Hotel[];
  events: Event[];
}
