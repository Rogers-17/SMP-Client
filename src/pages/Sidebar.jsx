import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {FiHome, FiSettings, FiLogOut} from 'react-icons/fi'
import {FaUserGraduate, FaChartLine, FaUserCircle} from 'react-icons/fa'
import {MdMenuBook} from 'react-icons/md'
import {AiOutlineHistory} from 'react-icons/ai'
import { useAuth } from '../helpers/AuthContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const Sidebar = () => {

  const navigate = useNavigate();
  const {authState} = useAuth();
  const location = useLocation();
  const navItems = [
      { name: 'Dashboard', to: '/admin/dashboard', icon: <FiHome size={24}/>},
      { name: 'Courses', to: '/admin/dashboard/courses', icon: <MdMenuBook size={24}/>},
      { name: 'Students', to: '/admin/dashboard/students', icon: <FaUserGraduate size={24}/>},
      { name: 'Reports', to: '/admin/dashboard/reports', icon: <FaChartLine size={24}/>},
      { name: 'Activity', to: '/admin/dashboard/activities', icon: <AiOutlineHistory size={24}/>},
      { name: 'Settings', to: '/admin/dashboard/setting', icon: <FiSettings size={24}/>},
  ];

  const logOut =  (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
        if (result.isConfirmed) {
        // Clear login token or session
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate('/admin/login')

        toast.success('Logged out successfully!', {
          position: 'top-right',
          autoClose: 1000,
        });
      }
  })
  }


  return (

    <div className="fixed top-0 left-0 md:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col bg-white z-50">
  {navItems.map((item) => {
    return (
      <Link to={item.to} key={item.name}>
        <div
          className={`flex items-center py-3 px-4 gap-3 ${
            location.pathname === item.to
              ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-500/90"
              : "hover:bg-gray-100/90 border-white transition-all delay-75 ease-in-out rounded-lg"
          }`}
        >
          <div className="w-7 h-7">
            {item.icon}
          </div>
          <p className="md:block hidden text-center">{item.name}</p>
        </div>
      </Link>
    );
  })}

  <div className="mt-auto border-t">
    <button onClick={logOut} className="flex items-center space-x-2 px-3  
    py-3 hover:bg-gray-100/90 border-white transition-all delay-75 ease-in-out rounded-lg">
    <FiLogOut className='w-8 h-8 rounded-full '/>
    <p className='md:block hidden text-center'>Logout</p>
    </button>

    <Link to="/admin/dashboard/profile" className="flex items-center space-x-2 px-3 py-3 bg-blue-500">
      <FaUserCircle className="w-8 h-8 rounded-full text-white" />
      <p className="text-base font-medium md:block hidden text-white">{authState.username}</p>
    </Link>
  </div>
</div>

  )
}

export default Sidebar
