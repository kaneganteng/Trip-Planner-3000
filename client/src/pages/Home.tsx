import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveUsers } from '../api/userAPI';
import { UserData } from '../interfaces/UserData';
import ErrorPage from './ErrorPage';
import auth from '../utils/auth';
import './Home.css';
import Flights from './Flights';
import Hotels from './Hotels';
import LocalEvents from './LocalEvents';
import airplaneImage from '../assets/airplane.jpg';
import happyFamilyImage from '../assets/happy family picture.jpg';
import logoImage from '../assets/logo.png';

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
            </div>
          )}
          {activeSection === 'hotels' && (
            <div>
              <Hotels />
            </div>
          )}
          {activeSection === 'localevents' && (
            <div>
              <LocalEvents />
            </div>
          )}
        </div>
        <section className="info-section">
          <h2>Why choose us for your trip</h2>
          <p>Because you don't want to waste time on planning rather than your trip.</p>
          <div className="info-boxes">
            <div className="info-box">Info</div>
            <div className="info-box">info</div>
            <div className="info-box">Info</div>
          </div>
        </section>
        <section className="middle-section">
          <div className="middle-content">
            <div className="text-block">
              <h3>Its time to take a flight</h3>
              <p>Your text content goes here...</p>
            </div>
            <div className="image-block">
            <img src={airplaneImage} alt="Airplane" />
          </div>
          </div>
          <div className="middle-content">
            <div className="image-block">
            <img src={happyFamilyImage} alt="Happy Family" />
           </div>
            <div className="text-block">
              <h3>Amazing Memories</h3>
              <p>Your text content goes here...</p>
            </div>
          </div>
        </section>
        <section className="additional-info">
          {/* Add your additional data here */}
        </section>
      </main>
      <footer className="footer-container">
        <div id="about-section" className="footer-column">
          <h3>About Us</h3>
          <p>Help us make a living</p>
        </div>
        <div id="contact-section" className="footer-column">
          <h3>Contact</h3>
          <p>Email: info@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-column">
          <h3>Follow Us</h3>
          <p>
            <a href="#">Facebook</a><br />
            <a href="#">Twitter</a><br />
            <a href="#">Instagram</a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
