import React, {useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Chat from './pages/chat/Chat'
import Profile from './pages/profile/Profile'
import { useAppStore } from './store'
import { apiClient } from './lib/apiClient'
import { GET_USER_INFO } from './utils/constants'


const PrivateRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuth = !!userInfo;
  return isAuth ? children : <Navigate to="/auth" />
};

const AuthRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuth = !!userInfo;
  return isAuth ? <Navigate to="/chat"/>: children;
};


function App() {
  const [loading, setLoading] = useState(true)
  const {userInfo, setUserInfo} = useAppStore();
  useEffect(() => {
    const getUserData =async() =>{
      try {
        const res = await apiClient.get(GET_USER_INFO,{
          withCredentials: true,
        });
        if (res.status === 200 && res.data.id) {
          setUserInfo(res.data);
        } else {
          setUserInfo(undefined);
        }
        console.log({res});
      } catch (error) {
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };
    if(!userInfo){
      getUserData();
    } else {
      setLoading (false);
    }
  }, [userInfo, setUserInfo]);
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
          path="/auth" 
          element={
          <AuthRoute>
          <Auth />
          </AuthRoute>
          } />
          <Route path="/chat" 
          element={
          <PrivateRoute>
          <Chat />
          </PrivateRoute>
          } />
          <Route path="/profile" 
          element={
          <PrivateRoute>
          <Profile />
          </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
