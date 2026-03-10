import Home from './pages/Home/Home';
import { Routes, Route, useParams } from 'react-router-dom';
import Profile from './pages/Profile/Profile'
import Header from './components/Header/Header';

// URL 파라미터 :userId를 추출하여 ProfilePage에 전달하는 컴포넌트
const ProfileRouteWrapper = () => {
  const { userId } = useParams<{ userId: string }>();
  // string으로 들어온 파라미터를 number로 변환하여 전달 (명세서 기반)
  return <Profile userId={Number(userId)} />;
};

function App() {
  return (
    <>
    {/* 1. 모든 페이지 상단에 노출될 헤더 */}
      <Header myId={1} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/profile/:userId" element={<ProfileRouteWrapper />} />
        
      </Routes>
    </>
  );
}

export default App;