import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

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
    <nav className='display-flex justify-space-between align-center py-2 px-5 mint-green'>
      <ul>
        <li><a href="#about-section">About Us</a></li>
        <li><a href="#contact-section">Contact</a></li>
      </ul>
      <div>
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
      </div>
    </nav>
  );
};

export default Navbar;
