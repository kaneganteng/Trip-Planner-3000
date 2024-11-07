import { User, Flight, Hotel, Event } from '../models/index.js';

export const seedUsers = async () => {
  // Create users
  const users = await User.bulkCreate(
    [
      { username: 'Licia', email: 'licia@guru.com', password: 'password' },
      { username: 'Kane', email: 'kane@scribe.com', password: 'password' },
      { username: 'Micheli', email: 'micheli@comet.com', password: 'password' },
    ],
    { individualHooks: true }
  );

  // Create associated flights, hotels, and events for each user
  await Promise.all(
    users.map(async (user: any) => {
      // Create flights
      await Flight.create({
        userId: user.id,
        destination: 'Paris',
        departureDate: new Date('2024-12-15'),
        price: 500.00, // Example price
      });
      await Flight.create({
        userId: user.id,
        destination: 'Tokyo',
        departureDate: new Date('2024-12-20'),
        price: 700.00, // Example price
      });

      // Create hotels
      await Hotel.create({
        userId: user.id,
        name: 'Le Meridien Etoile',
        checkInDate: new Date('2024-12-16'),
        checkOutDate: new Date('2024-12-20'),
        price: 120.00, // Example nightly price
      });
      await Hotel.create({
        userId: user.id,
        name: 'Shinjuku Granbell Hotel',
        checkInDate: new Date('2024-12-21'),
        checkOutDate: new Date('2024-12-25'),
        price: 150.00, // Example nightly price
      });

      // Create events
      await Event.create({
        userId: user.id,
        name: 'Eiffel Tower Tour',
        eventDate: new Date('2024-12-17'),
        location: 'Paris, France',
        description: 'A guided tour of the iconic Eiffel Tower',
      });
      await Event.create({
        userId: user.id,
        name: 'Shibuya Crossing Photography Meetup',
        eventDate: new Date('2024-12-22'),
        location: 'Shibuya, Tokyo',
        description: 'Meetup for photographers at the famous Shibuya Crossing',
      });
    })
  );
};