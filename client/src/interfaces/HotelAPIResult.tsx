
export interface HotelAPIResult {
    data: {
      chainCode: string;
      iataCode: string;
      dupeId: number;
      name: string;
      hotelId: string;
      geoCode: {
        latitude: number;
        longitude: number;
      };
      address: {
        countryCode: string;
      };
      lastUpdate: string;
    }[];
  }
  