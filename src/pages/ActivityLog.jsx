import React, {act, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AiOutlineSearch} from 'react-icons/ai'
import Swal from 'sweetalert2'

const ActivityLog = () => {

    
    const API_URL = process.env.NODE_ENV === "production" 
    ? 'https://uniflow-portal-server.onrender.com/' : 'http://localhost:4000';
    const { id } = useParams();
    const [activities, setActivities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const activityPerPage = 8;

    useEffect(() => {
      axios.get(`${APiURl}/api/activities/all`)
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []); 

  const deleteActivity = async (id) => {
                axios.delete(`${API_URL}/api/activities/delete/${id}`)
                  .then(response => {
                    setActivities((prev) => prev.filter((activities) => activities.id !== id));
                      toast.success("Deleted Successfully!");
                  })
                  .catch(err => toast.error(err));
        }

      //Pagination filter
          const totalPages = Math.ceil(activities.length / activityPerPage);
          const indexOfLast = currentPage * activityPerPage;
          const indexOfFirst = indexOfLast - activityPerPage;
          const currentActivities = activities.slice(indexOfFirst, indexOfLast);
        
          // Pagination controls
          const getPageNumbers = () => {
            const maxVisible = 8;
            let startPage = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
            let endPage = startPage + maxVisible - 1;
        
            if(endPage > totalPages) {
              endPage = totalPages;
              startPage = Math.max(endPage - maxVisible + 1, 1);
            }
        
            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
              pages.push(i);
            }
            return pages;
          }
        
          useEffect(() => {
            setCurrentPage(1);
          }, [])
        
    

  return (
    <>
    <div className="flex-1 min-h-screen flex flex-col">
            <div className='flex justify-between w-full max-w-4xl'>
            <h2 className="pb-4 sm:text-lg md:text-xl font-medium">Activity Log</h2>
            </div>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/40 shadow-sm">
          <table className=" table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-lg text-left">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Activity</th>
                <th className="px-4 py-3 font-medium truncate ">Username</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                  Role
                </th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                  Date
                </th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-550">
              {currentActivities.map((activities, index) => (
                <tr key={index} className="border-t border-gray-500/40">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <span className="truncate w-full">
                      {activities.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 ">{activities.username}</td>
                  <td className="px-4 py-3 max-sm:hidden">{activities.role}</td>
                  <td className="px-4 py-3 max-sm:hidden">{new Date(activities.timestamps).toLocaleDateString('en-us',{
                    day: 'numeric',
                    month:'short',
                    year: 'numeric'
                  })}</td>
                  <td className="px-4 py-3 max-sm:hidden flex gap-3 text-center justify-center">
                    <button
                    className='hidden md:flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-blue-500 text-white rounded-md'>
                      <span>Edit</span>
                    </button>
                    <button 
                    onClick={(e) => deleteActivity(activities.id)}
                    className="hidden md:flex  items-center gap-1 px-1.5 md:px-3.5 py-2 bg-red-500 text-white rounded-md">
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <div className='flex justify-center gap-2 mt-6 max-w-4xl'>
          <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='md:px-3 md:py-1 md:text-base px-2 py-1 text-xs bg-gray-300 rounded disabled:opacity-50 cursor-pointer'>Prev</button>
          {getPageNumbers().map(page => (
            <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`md:px-3 md:py-1 md:text-base px-2 py-1 text-xs rounded cursor-pointer ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {page}
            </button>
          ))}
          <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='md:px-3 md:py-1 md:text-base px-2 py-1 text-xs bg-gray-300 rounded disabled:opacity-50 cursor-pointer'>
            Next
          </button>
      </div>
    </div>
    </>
  )
}

export default ActivityLog
