import React, { useState , useEffect} from 'react';

const AuthenticationContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthenticationProvider = (props) => {
  // Load token from localStorage on component mount
  const storedToken = localStorage.getItem('authToken');
  const [token, setToken] = useState(storedToken);
  const userLoggedIn = !!token;

  // Update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);


  const login = (newToken) => {
    setToken(newToken);
    
  };

  const logout = () => {
    setToken(null);

  };

  const contextValue = {
    token: token,
    isLoggenIn: userLoggedIn,
    login: login,
    logout: logout,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
