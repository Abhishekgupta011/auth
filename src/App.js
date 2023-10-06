import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import UserProfile from './Components/Profile/UserProfile';
import HomePage from './Components/Pages/HomePage';
import AuthPage from './Components/Pages/AuthPage';
import { useContext } from 'react';
import AuthenticationContext from './Components/AuthContext/AuthenticationContext';

function App() {
  const authctx = useContext(AuthenticationContext);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/auth'
          element={authctx.isLoggedIn ? <Navigate to='/profile' /> : <AuthPage />}
        />

        <Route
          path='/profile'
          element={authctx.isLoggedIn ? <UserProfile /> : <Navigate to='/auth' />}
        />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Layout>
  );
}

export default App;
