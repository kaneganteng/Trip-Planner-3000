// server/src/routes/amadeusRoutes.js

import express from 'express';
import axios from 'axios';
import type { Request, Response } from 'express';
const router = express.Router();

const CLIENT_ID = process.env.AMADEUS_CLIENT_ID; // Store your Amadeus credentials in environment variables
const CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;

// Route to retrieve access token
// DO NOT EDIT PLEASE <3
router.post('/getToken', async (_req: Request, res: Response) => {
  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve token' });
  }
});

// Route to fetch hotels by city code

// Totally mess-upable
router.get('/hotels/:cityCode', async (req: Request, res: Response) => {
  const { cityCode } = req.params;
  console.log(cityCode);
  // Check if the Authorization header is provided
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }


  try {
    const response = await axios.get(
    // note to self to bring ${cityCode} back in
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=ORL&radius=5&radiusUnit=KM&hotelSource=ALL",
      {
        headers: { Authorization: `Bearer ${authHeader}`, 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
    // console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
        console.log('Axios error:', error.message);
        
        if (error.response) {
          console.log('Status:', error.response.status);
          
          // Drill into the `errors` array within `data`
          const errorData = error.response.data;
          if (errorData && errorData.errors) {
            console.log('Error details:');
            errorData.errors.forEach((err: any, index: number) => {
              console.log(`Error ${index + 1}:`, err);
            });
          } else {
            console.log('Data:', errorData);
          }
          
          console.log('Headers:', error.response.headers);

          console.log('Token', error.response.headers.Authorization )
        } else if (error.request) {
          console.log('No response received:', error.request);
        } else {
          console.log('Error setting up request:', error.message);
        }
      } else {
        console.error('Non-Axios error:', error);
      }
      
      console.log("-----------");
    // console.error(error);
   
    return res.status(500).json({ message: 'Failed to fetch hotels' });
  }
});

router.get('/flights')

export { router as amadeusRouter };