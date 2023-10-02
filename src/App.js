import { Route, Routes } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import UserProfile from './Components/Profile/UserProfile';
import HomePage from './Components/Pages/HomePage';
import AuthPage from './Components/Pages/AuthPage';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' exact element={<HomePage />}/>
   
        <Route path='/auth' element={<AuthPage />}/>
  
        <Route path='/profile' element={<UserProfile />}/>
      </Routes>
    </Layout>
  );
}

export default App;
