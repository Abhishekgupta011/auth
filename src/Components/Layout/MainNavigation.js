import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthenticationContext from '../AuthContext/AuthenticationContext';

const MainNavigation = () => {
  const authContext = useContext(AuthenticationContext);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          {authContext.token ? (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={authContext.logout}>Logout</button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
