import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationContext from '../AuthContext/AuthenticationContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authContext = useContext(AuthenticationContext);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    authContext.logout();
    // Redirect to the homepage after logout
    navigate('/auth');
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authContext.isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li> }
          {authContext.token && (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
