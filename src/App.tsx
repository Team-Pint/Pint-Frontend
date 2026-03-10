import React from 'react';
import ProfilePage from './pages/Profile/Profile';
import PhotoUpload from './pages/PhotoUpload/PhotoUpload';
import Home from './pages/Home/Home';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import Profile from './pages/Profile/Profile'

// URL 파라미터 :userId를 추출하여 ProfilePage에 전달하는 컴포넌트
const ProfileRouteWrapper = () => {
  const { userId } = useParams<{ userId: string }>();
  // string으로 들어온 파라미터를 number로 변환하여 전달 (명세서 기반)
  return <Profile userId={Number(userId)} />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/profile/:userId" element={<ProfileRouteWrapper />} />
        <Route path='/upload' element={<PhotoUpload />} />
      </Routes>
    </>
  );
}

export default App;