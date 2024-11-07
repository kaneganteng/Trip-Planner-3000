import { User, Flight, Hotel, Event} from './user.js';  // Import the User model

// Set up model associations
User.associate({ Flight, Hotel, Event });
Flight.associate({ User });
Hotel.associate({ User });
Event.associate({ User });

// Export models for use elsewhere
export { User, Flight, Hotel, Event };




