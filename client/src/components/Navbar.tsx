import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import logoImage from '../assets/logo.png';


const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <nav className='display-flex justify-space-between align-center py-2'>
            <img src={logoImage} alt="Trips Planner 3000 Logo" className="logo"/>
      <ul className= 'about'>
        <li><a href="#about-section">About Us</a></li>
        <li><a href="#contact-section">Contact</a></li>
        {!loginCheck ? (
          <button className='btn' type='button'>
            <Link to='/login'>Login</Link>
          </button>
        ) : (
          <button
            className='btn'
            type='button'
            onClick={() => {
              auth.logout();
              setLoginCheck(false);
            }}
          >
            Logout
          </button>
        )}
      </ul>

    </nav>
  );
};

export default Navbar;
