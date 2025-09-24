import { Outlet, Navigate } from 'react-router-dom'
import StudentSidebar from './StudentSidebar';

const StudentMainLayout = () => {
    const isLoggedIn = localStorage.getItem('student');

    if (!isLoggedIn) return <Navigate to='/student/login' />; 

  return (
    <div>
  <StudentSidebar />
  {/* Main Content Wrapper */}
  <div className="md:ml-64 ml-16 p-4">
    <Outlet />
  </div>
</div>
  )
}

export default StudentMainLayout