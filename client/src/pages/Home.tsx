import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveUsers } from '../api/userAPI';
import { UserData } from '../interfaces/UserData';
import ErrorPage from './ErrorPage';
import auth from '../utils/auth';
import './Home.css';
import Flights from './Flights';
import Hotels from './Hotels';
import LocalEvents from './LocalEvents';

const Home = () => {
  const [_users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [activeSection, setActiveSection] = useState<'flights' | 'hotels' | 'localevents'>('flights');

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const showFlights = () => setActiveSection('flights');
  const showHotels = () => setActiveSection('hotels');
  const showLocalEvents = () => setActiveSection('localevents');

  // const handleSearch = () => {
  //   console.log('Search button clicked');
  //   // Add logic here to handle the trip search
  // };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <header>
        <h1>Trips Planner 3000</h1>
        <nav>
          <ul>
            <li><button onClick={showFlights}>Flights</button></li>
            <li><button onClick={showHotels}>Hotels</button></li>
            <li><button onClick={showLocalEvents}>Local Events</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className='content'>
          {activeSection === 'flights' && (
            <div>
              <Flights />
              {/* <button onClick={handleSearch} className="search-button">Search</button> */}
            </div>
          )}
          {activeSection === 'hotels' && (
            <div>
              <Hotels />
              {/* <button onClick={handleSearch} className="search-button">Search</button> */}
            </div>
          )}
          {activeSection === 'localevents' && (
            <div>
              <LocalEvents />
              {/* <button onClick={handleSearch} className="search-button">Search</button> */}
            </div>
          )}
        </div>
        <section className="info-section">
          <h2>Why choose us for your trip</h2>
          <p>Because you don't want to waste time on planning rather than your trip.</p>
          <div className="info-boxes">
            <div className="info-box">Info</div>
            <div className="info-box">Weather</div>
            <div className="info-box">Info</div>
          </div>
        </section>
      </main>
      <footer>
        <ul>
          <li>Copyright</li>
          <li>Privacy Policy</li>
          <li>About Us</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </footer>
    </>
  );
};

export default Home;
