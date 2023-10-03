import React, { useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    // Clear feedback when switching auth mode
    setFeedback({ message: '', type: '' });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    setIsLoading(true);

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJPMq08vsmSHC0N9m8Knd-IlEsJP-X7KQ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken : true,
        }),
        
      });

      const responseData = await response.json();

      if (response.ok) {
        // Registration successful
        setFeedback({ message: 'Registration successful', type: 'success' });
      } else {
        // Registration failed
        setFeedback({ message: responseData.message || 'Registration failed', type: 'error' });
      }
    } catch (error) {
      console.error('An error occurred during registration', error);
      setFeedback({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      {feedback.message && (
        <p className={`${classes.feedback} ${feedback.type === 'error' ? classes.error : classes.success}`}>
          {feedback.message}
        </p>
      )}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <button type='submit' className={classes.toggle}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          )}
        </div>
        <div className={classes.actions}>
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
