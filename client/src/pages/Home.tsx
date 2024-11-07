import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
// import UserList from '../components/Users';
import auth from '../utils/auth';
import './Home.css';
import Flights from "./Flights";

const Home = () => {
    const [_users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

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
    }

    const handleSearch = () => {
        // Add logic here to handle the trip search
        console.log('Search button clicked');
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            <header>
                <h1>Trips planer 3000</h1>
                <nav>
                    <ul>
                        <li>Flights</li>
                        <li>Hotels</li>
                        <li>Local Events</li>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contacts</li>
                    </ul>
                </nav>
            </header>
           <Flights/>
            <main>
                <section className="info-section">
                    <h2>Why choose us for your trip</h2>
                    <p>because you don't want to waste time on the planning rather on your trip</p>
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
