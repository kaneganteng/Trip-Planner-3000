export interface FlightOfferProps {
  offer: {
    id: string;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: Array<{
      duration: string;
      segments: Array<{
        departure: {
          iataCode: string;
          terminal: string;
          at: string;
        };
        arrival: {
          iataCode: string;
          terminal?: string;
          at: string;
        };
        carrierCode: string;
        number: string;
        aircraft: {
          code: string;
        };
        duration: string;
        numberOfStops: number;
      }>;
    }>;
    price: {
      currency: string;
      total: string;
      base: string;
      grandTotal: string;
    };
    travelerPricings: Array<{
      travelerType: string;
      price: {
        currency: string;
        total: string;
        base: string;
      };
      fareDetailsBySegment: Array<{
        segmentId: string;
        cabin: string;
        class: string;
      }>;
    }>;
  };
}