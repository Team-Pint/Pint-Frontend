import Home from './pages/Home/Home';
import { Routes, Route, useParams, useLocation, Navigate } from 'react-router-dom';
import Profile from './pages/Profile/Profile'
import Header from './components/Header/Header';
import Login from './pages/Login/Login';

const ProfileRouteWrapper = () => {
  const { userId } = useParams<{ userId: string }>();
  return <Profile userId={Number(userId)} />;
};

function App() {
  const location = useLocation();
  const storedUserId = Number(localStorage.getItem("userId"));
  const myId = Number.isInteger(storedUserId) && storedUserId > 0 ? storedUserId : undefined;

  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header myId={myId} />}
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path="/profile/:userId" element={<ProfileRouteWrapper />} />
      </Routes>
    </>
  );
}

export default App;
