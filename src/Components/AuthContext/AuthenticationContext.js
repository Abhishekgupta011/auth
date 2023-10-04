
import React, { createContext, useContext, useState } from 'react';

const AuthenticationContext = createContext();

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider = (props) => {
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthenticationContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;  
