import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {FiHome, FiSettings, FiLogOut, FiSend} from 'react-icons/fi'
import {FaUserCircle, FaFileAlt} from 'react-icons/fa'
import {BsClipboardCheck} from 'react-icons/bs'
import { UseStudent } from '../helpers/StudentAuthContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const Sidebar = () => {

  const navigate = useNavigate();
  const {studentState} = UseStudent();
  const location = useLocation();
  const navItems = [
      { name: 'Dashboard', to: '/student/dashboard', icon: <FiHome size={24}/>},
      { name: 'Plan Course', to: '/student/plancourses', icon: <BsClipboardCheck size={24}/>},
      { name: 'GradeSheet', to: '/student/gradesheet', icon: <FaFileAlt size={24}/>},
      { name: 'Request', to: '/student/requests', icon: <FiSend size={24}/>},
      { name: 'Settings', to: '/student/settings', icon: <FiSettings size={24}/>},
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
        localStorage.removeItem("studentToken");
        localStorage.removeItem("student");
        navigate('/student/login')

        toast.success('Logged out successfully!', {
          position: 'top-right',
          autoClose: 1000,
        });
      }
  })
  }

  return (

    <div className="fixed top-0 left-0 md:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col bg-blue-950 text-white z-50">
  {navItems.map((item) => {
    return (
      <Link to={item.to} key={item.name}>
        <div
          className={`flex items-center py-3 px-4 gap-3 ${
            location.pathname === item.to
              ? "border-r-4 md:border-r-[8px] bg-blue-700 border-gray-200"
              : "hover:bg-white hover:text-black border-white transition-all delay-75 ease-in-out"
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
    <div onClick={logOut} className="flex items-center space-x-2 px-3 cursor-pointer  
    py-3 hover:bg-white hover:text-black border-white transition-all delay-75 ease-in-out">
    <FiLogOut className='w-8 h-8 rounded-full'/>
    <p className='md:block hidden text-center'>Logout</p>
    </div>

    <Link to="/student/profile" className="flex items-center space-x-2 px-3 py-3 bg-blue-700">
      <FaUserCircle className="w-8 h-8 rounded-full text-white" />
      <p className="text-base font-bold md:block hidden text-white">{studentState.studentId} 
        <br /><span className='font-normal text-base'>{(studentState.role).toUpperCase()}</span></p>
    </Link>
  </div>
</div>

  )
}

export default Sidebar
