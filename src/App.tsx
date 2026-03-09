import React from 'react';
import ProfilePage from './pages/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import PhotoUpload from './pages/PhotoUpload/PhotoUpload';
import Home from './pages/Home/Home';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/upload' element={<PhotoUpload />} />
      </Routes>
    </>
  );
};

export default App;