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
    <Routes>
      {/* 프로필 페이지 경로 설정: 
        사용자 아이디(userId)를 URL 파라미터로 받습니다. 
      */}
      <Route path="/profile/:userId" element={<ProfileRouteWrapper />} />

      {/* 기본 경로(/) 접속 시 테스트를 위해 1번 유저의 프로필로 이동 */}
      <Route path="/" element={<Navigate to="/profile/1" />} />

      {/* 기타 정의되지 않은 경로는 404 메시지 출력 */}
      <Route path="*" element={
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 font-serif text-xl">Page Not Found</p>
        </div>
      } />
    </Routes>
  );
}

export default App;