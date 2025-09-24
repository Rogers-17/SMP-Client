import React, { useEffect, useState  } from 'react'
import { MdMenuBook  } from 'react-icons/md'
import {FaUserGraduate, FaUserCircle, FaChartLine} from 'react-icons/fa'
import axios from 'axios'

const DashboardStats = () => {

  const [stats, setStats] = useState([
    {
      icon: <MdMenuBook size={25}/>,
      type: "Total Courses",
      value: "0",
    },
    {
      icon: <FaUserGraduate size={25}/>,
      type: "Total Students",
      value: "0",
    },
    {
      icon: <FaUserCircle size={25}/>,
      type: "Active Users",
      value: "0"
    },
    {
      icon: <FaChartLine size={25}/>,
      type: "Success Rate",
      value: "78%"
    },
    {
      icon: <FaChartLine size={25}/>,
      type: "Total Teachers",
      value: "9"
    },
    {
      icon: <FaChartLine size={25}/>,
      type: "Current Semester",
      value: "Semester I 2025"
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/totals")
    .then((response) => {
      setStats(prevStats => prevStats.map(stat => {
        if(stat.type === "Total Courses") return { ...stat, value: response.data.totalCourses};
        if(stat.type === "Total Students") return { ...stat, value: response.data.totalStudents};
        if(stat.type === "Active Users") return { ...stat, value: response.data.totalUsers};
        return stat;
      }));
    })
    .catch((error) => {
      console.log(error);
    })
  },[])


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mb-5 max-w-4xl">
    {stats.map((stat, key) => (
      <div key={key} className="bg-white shadow-md rounded-lg p-5 border">
      <div className='flex justify-between items-center mb-4'>
        <div className='bg-blue-500 rounded-lg flex items-center justify-center text-white p-2'>
            {stat.icon}
        </div>
      </div>
      <div className='text-gray-600/90 text-sm'>{stat.type}</div>
      <div className='text-xl font-medium'>{stat.value}</div>
      </div>
    ))}
</div>
  )
}

export default DashboardStats
