import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineSearch} from 'react-icons/ai'
import Swal from 'sweetalert2';

const CourseList = () => {
    const APiURl = "http://localhost:4000";
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [collegeFilter, setCollegeFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const studentPerPage = 6;

    const { id } = useParams();

    useEffect(() => {

        axios.get(`${APiURl}/api/courses`)
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
      }, []);

      const deleteCourse = async (id) => {
        Swal.fire({
                  title: 'Are you sure?',
                  text: 'Your Course will be deleted!',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, DELETE!'
              }).then((result) => {
                if(result.isConfirmed) {
                    axios.delete(`http://localhost:4000/api/courses/delete/${id}`)
                  .then(response => {
                    setCourses((prev) => prev.filter((course) => course.id !== id));
                      toast.success("Deleted Successfully!");
                  })
                  .catch(err => toast.error(err));
                }
              })
        }

       // First filter by major and search
    const filteredCourses = courses.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCollege = collegeFilter === 'All' || 
    course.courseName.toLowerCase() === collegeFilter.toLowerCase() ||
    course.college?.toLowerCase() === collegeFilter.toLowerCase();
    return matchesSearch && matchesCollege;
  })

  //Pagination filter
    const totalPages = Math.ceil(filteredCourses.length / studentPerPage);
    const indexOfLast = currentPage * studentPerPage;
    const indexOfFirst = indexOfLast - studentPerPage;
    const currentStudents = filteredCourses.slice(indexOfFirst, indexOfLast);
  
    // Pagination controls
    const getPageNumbers = () => {
      const maxVisible = 6;
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
    }, [searchTerm, collegeFilter])
  


  return (
    <>
    <div className='flex gap-2 mb-4 max-w-4xl w-full md:text-base md:px-4 md:py-2 px-2 py-1 text-xs border rounded bg-gray-100'>
                <AiOutlineSearch size={20}/>
                <input type="text" 
                placeholder='Search course...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full bg-transparent focus:outline-none'/>
              </div>
              <div className='flex gap-1 md:gap-2 mb-4 items-center justify-center max-w-4xl'>
                {['All', 'IT College', 'Business College'].map(college => (
                  <button
                  key={college}
                  onClick={() => setCollegeFilter(college)}
                  className={`px-2 py-1 rounded-full text-xs md:px-3 md:py-2 md:text-base hover:bg-gray-200 ${collegeFilter === college ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  >
                    {college}
                  </button>
                ))}
              </div>
    <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/40 shadow-sm">
          <table className=" table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-base text-left">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Course Name</th>
                <th className="px-4 py-3 font-medium truncate ">College</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                  Code
                </th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                  Date
                </th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-550">
              {currentStudents.map((course, index) => (
                <tr key={index} className="border-t border-gray-500/40">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <span className="truncate w-full">
                      {course.courseName}
                    </span>
                  </td>
                  <td className="px-4 py-3 ">{course.college}</td>
                  <td className="px-4 py-3 max-sm:hidden">{course.code}</td>
                  <td className="px-4 py-3 max-sm:hidden">{new Date(course.createdAt).toLocaleDateString('en-us',{
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
                    onClick={(e) => deleteCourse(course.id)}
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
    </>
  )
}

export default CourseList
