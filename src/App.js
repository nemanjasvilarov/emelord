import './App.css';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Posts from './components/Post/Posts';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Missing from './components/Missing';
import UserDetails from './components/User/UserDetails';
import PersistentLogin from './components/PersistentLogin';
import Logout from './components/User/Logout';
import NewPost from './components/Post/NewPost';
import Comments from './components/Comments/Comments';
import TopUsers from './components/User/TopUsers';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Navigate to='/login' />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<PersistentLogin />}>
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="posts" element={<Posts />} />
            <Route path="new-post" element={<NewPost />} />
            <Route path="user" element={<UserDetails />} />
            <Route path="logout" element={<Logout />} />
            <Route path="comments" element={<Comments />} />
            <Route path="users-top" element={<TopUsers />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
