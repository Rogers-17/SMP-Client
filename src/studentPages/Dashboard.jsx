import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBookOpen, FaFileContract, FaUserCircle } from 'react-icons/fa'
import {profile, academicStats, upcomingDate, academicProgress} from '../assets/index'
import { UseStudent } from '../helpers/StudentAuthContext'
import axios from 'axios'

const Dashboard = () => {

  const APiURl = "http://localhost:4000";
  const [userProfile, SetUserProfile] = useState([]);
  const [academicStatsData, SetAcademicStatsData] = useState([]);
  const [upcomingEvents, SetUpcomingEvents] = useState([]);
  const [academicProgressReports, SetAcademicProgressReports] = useState([]);
  const { studentState, loading } = UseStudent();

  const fetchDatas = async () => {
    if(loading) return;
    if(!studentState) return;
    axios.get(`${APiURl}/api/students/byId/${studentState.id}`).then((res) => {
      SetUserProfile(res.data);
    })
    .catch(err => console.error(err));

    SetAcademicStatsData(academicStats);
    SetUpcomingEvents(upcomingDate)
    SetAcademicProgressReports(academicProgress)
  }

  useEffect(() => {
    fetchDatas();
  }, [])

  const quickActions = [
  { id: 1, label: "Plan Course", path: "/student/plancourses" , icon: <FaUserCircle/>},
  { id: 2, label: "View Grades", path: "/student/gradesheet" , icon: <FaBookOpen/>},
  { id: 3, label: "Contact Advisor", path: "/student/requests" , icon: <FaFileContract/>},
  { id: 4, label: "View Courses", path: "/student/plancourses" , icon: <FaBookOpen/>},
  { id: 5, label: "Request", path: "/student/requests" , icon: <FaBookOpen/>},
 ]

  return (
    <div className='flex-1 min-h-screen flex flex-col justify-between bg-gray-50'>
      <div className='w-full'>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-900">Dashboard</h2>
        <p className='text-sm text-gray-600/95 pb-4'>View Students Information and Data</p>
        {/**Personal Information */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'> 
        <div className='bg-white rounded-xl p-6 shadow w-full border-t-8 border-blue-900'>
            <div className='flex flex-col items-center text-blue-900'>
              <FaUserCircle size={50}/>
            
              <h2 className='text-xl md:text-2xl font-medium text-blue-900'>{userProfile.studentName}</h2>
              <p className='text-gray-600 md:text-lg text-base'>{userProfile.major}</p>
              <p className='text-blue-900 md:text-lg text-base font-medium'>{userProfile.studentId}</p>
              <p className='text-gray-600 mt-1 text-sm md:text-sm italic mb-6'>{userProfile.role}</p>
              <div>
                <div className='space-y-2 text-blue-900 text-sm'>
                  <p><span className='font-bold text-xl'>Phone:</span> +231779268242</p>
                  <p><span className='font-bold text-xl'>Address:</span> Johnsonville, Logan Town</p>
                  <p><span className='font-bold text-xl'>Semester:</span> Semester I 2025</p>
                </div>
            </div>
            </div>
          </div>

        {/**Chart Information */}
        <div className='bg-white rounded-xl p-6 shadow w-full border-t-8 border-blue-900'>
          <div className='flex items-center flex-col text-4xl'>
            <h2 className='text-center'>CHART</h2>
          </div>
          </div>

        {/**Quick Actions */}
          <div className='col-span-1 md:col-span-2 bg-white p-6 rounded-xl shadow-md border-t-8 border-blue-900'>
              <h3 className='font-semibold text-blue-900 mb-3'>Quick Actions</h3>
            <div className='flex gap-4 flex-wrap'>
              {quickActions.map((action) => (
                <Link key={action.id}
                to={action.path}
                className='flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-md
                hover:bg-blue-700 transition'>
                  <span>{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </div>
            </div>

            {/**Events Section */}
            <Link to="/student/dashboard/upcoming-dates" className='bg-white rounded-xl p-4 shadow border-t-8 border-blue-900 text-center'>
          <h3 className='font-semibold text-blue-900 mb-3'>Upcoming Important Dates</h3>
          <ul className='text-gray-700 space-y-2'>
            {upcomingEvents.map((item) => (
              <li key={item.id} className='flex justify-between border-b-2 border-blue-900 pb-1'>
                <span>{item.title}</span>
                <span className='font-semibold'>{new Date(item.date).toLocaleDateString('en-us',{
                    day: 'numeric',
                    month:'short',
                    year: 'numeric'
                  })}</span>
              </li>
            ))}
          </ul>
        </Link>
        <div className='bg-white rounded-xl p-4 shadow border-t-8 border-blue-900 text-center'>
          <h3 className='font-semibold text-blue-900 mb-3'>Academic Progress</h3>
          <ul className='text-gray-700 space-y-2'>
            {academicProgressReports.map((item) => (
              <li key={item.id} className='flex justify-between border-b-2 border-blue-900 pb-1'>
                <span>{item.title}</span>
                <span className='font-semibold'>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        </div>


  </div>      
    </div>
  )
}

export default Dashboard
