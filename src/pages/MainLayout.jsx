import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from './Sidebar';

const MainLayout = () => {
    const isLoggedIn = localStorage.getItem('accessToken');

    if (!isLoggedIn) return <Navigate to='/admin/login' />;

  return (
    <div>
  <Sidebar />
  {/* Main Content Wrapper */}
  <div className="md:ml-64 ml-16 p-4">
    <Outlet />
  </div>
</div>
  )
}

export default MainLayout
