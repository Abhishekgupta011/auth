import React, { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthenticationContext from '../AuthContext/AuthenticationContext';


const ProfileForm = () => {
  const enterNewPassword = useRef();
  const AuthCtx = useContext(AuthenticationContext) 

  const handlePassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCJPMq08vsmSHC0N9m8Knd-IlEsJP-X7KQ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: AuthCtx.token, // Use the token from the authentication context
          password: enterNewPassword.current.value,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData);
      } else {
        console.log('Password change failed:', responseData.error.message);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  return (
    <form className={classes.form} onSubmit={handlePassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={enterNewPassword}/>
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
