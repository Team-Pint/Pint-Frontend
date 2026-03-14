import Home from './pages/Home/Home';
import { Routes, Route, useParams, useLocation, Navigate } from 'react-router-dom';
import Profile from './pages/Profile/Profile'
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import PostDetail from './pages/PostDetail/PostDetail';

// URL 파라미터 :userId를 추출하여 ProfilePage에 전달하는 컴포넌트
const ProfileRouteWrapper = () => {
  const { userId } = useParams<{ userId: string }>();
  return <Profile userId={Number(userId)} />;
};

function App() {
  // 1. 현재 페이지의 경로 정보를 가져옵니다.
  const location = useLocation();

  // 2. 헤더를 숨기고 싶은 경로를 정의합니다.
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {/* 3. 로그인 페이지가 아닐 때만 헤더를 렌더링합니다. */}
      {!isLoginPage && <Header myId={1} />}
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/profile/:userId" element={<ProfileRouteWrapper />} />
      </Routes>
    </>
  );
}

export default App;