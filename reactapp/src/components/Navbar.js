import React, { useContext } from 'react';
import Icon from '../images/barbell.png';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Home from '@mui/icons-material/Home';
import Profile from '@mui/icons-material/AccountCircle';
import Goal from '@mui/icons-material/EmojiEvents';

const Navbar = () => {
    const { isSignedIn, setIsSignedIn } = useContext(AppContext);

    // History variable is used to update the path of the site
    const history = useHistory();
    const location = useLocation();

    // Function that takes the path of the clicked item on the navbar to update the route
    const handleNavbarClick = (route) => {
        history.push(route);
    };

    // Sign out user
    const handleSignOutClick = () => {
        setIsSignedIn(false);
        history.push('/');
    };

    return (
        <div className='navbar-container'>
            {isSignedIn ? (
                <>
                    <div
                        onClick={() => {
                            handleNavbarClick('/user/home');
                        }}
                        className='navbar-icon-header-container'>
                        <img className='navbar-icon' src={Icon} alt='barbell' />
                        <span className='navbar-header'>ProjectName</span>
                    </div>
                    <div className='navbar-links-container'>
                        <div
                            onClick={() => {
                                handleNavbarClick('/user/home');
                            }}
                            className={location.pathname === '/user/home' ? 'navbar-link-clicked' : 'navbar-link'}>
                            <Home fontSize={'large'} />
                        </div>
                        <div
                            onClick={() => {
                                handleNavbarClick('/user/workouts');
                            }}
                            className={location.pathname === '/user/workouts' ? 'navbar-link-clicked' : 'navbar-link'}>
                            <Goal fontSize={'large'} />
                        </div>
                        <div
                            onClick={() => {
                                handleNavbarClick('/user/profile');
                            }}
                            className={location.pathname === '/user/profile' ? 'navbar-link-clicked' : 'navbar-link'}>
                            <Profile fontSize={'large'} />
                        </div>
                        <div style={{ marginLeft: '1rem', fontSize: '1.25rem' }} onClick={handleSignOutClick} className='navbar-link'>
                            Sign Out
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        onClick={() => {
                            handleNavbarClick('/');
                        }}
                        className='navbar-icon-header-container'>
                        <img className='navbar-icon' src={Icon} alt='barbell' />
                        <span className='navbar-header'>ProjectName</span>
                    </div>
                    <div className='navbar-links-container'>
                        <div
                            onClick={() => {
                                handleNavbarClick('/signin');
                            }}
                            className={location.pathname === '/signin' ? 'navbar-link-clicked' : 'navbar-link'}>
                            Sign In
                        </div>
                        <div
                            onClick={() => {
                                handleNavbarClick('/signup');
                            }}
                            className={location.pathname === '/signup' ? 'navbar-link-clicked' : 'navbar-link'}>
                            Sign Up
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;
