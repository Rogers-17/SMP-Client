import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AddStudents } from '../modals/AddStudents'
import { AiOutlineSearch} from 'react-icons/ai'

const Students = () => {

  const APiURl = process.env.NODE_ENV === "production" 
    ? 'https://uniflow-portal-server.onrender.com/' : 'http://localhost:4000';
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [majorFilter, setMajorFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const studentPerPage = 6;
  
  const { id } = useParams();

  useEffect(() => {
      axios.get(`${APiURl}/api/students`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const deleteStudent = async (id) => {
    await axios.delete(`${APiURl}/api/students/delete/${id}`)
        .then(response => {
            setStudents((prevStudents) => prevStudents.filter(student => student.id !== id));
            toast.success("Deleted Successfully");
        })
        .catch(err => toast.error(err));
  }

  // First filter by major and search
  const filteredStudents = students.filter(student => {
    const lowerSearch = searchTerm.toLowerCase();

    const matchesName = student.studentName.toLowerCase().includes(lowerSearch);
    const matchesId = student.studentId.toString().includes(lowerSearch);
    const matchesMajor = majorFilter === 'All' || student.major === majorFilter;
    return (matchesName || matchesId ) && matchesMajor;
  })

  //Pagination filter
  const totalPages = Math.ceil(filteredStudents.length / studentPerPage);
  const indexOfLast = currentPage * studentPerPage;
  const indexOfFirst = indexOfLast - studentPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

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
  }, [searchTerm, majorFilter])

  return (
    <>
    <div className="flex-1 min-h-screen flex flex-col">
        <div className='flex justify-between w-full max-w-4xl'>
        <h2 className="pb-4 sm:text-lg md:text-xl font-medium">Students</h2>
        <button onClick={AddStudents} className='bg-blue-500 p-1 text-center sm:text-lg md:text-xl text-white rounded mb-2'>
        Add +
        </button>
        </div>
        <div className='flex gap-2 mb-4 max-w-4xl w-full md:text-base md:px-4 md:py-2 px-2 py-1 text-xs border rounded bg-gray-100'>
          <AiOutlineSearch size={20}/>
          <input type="text" 
          placeholder='Search students...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full bg-transparent focus:outline-none'/>
        </div>
        <div className='flex gap-1 md:gap-2 mb-4 items-center justify-center max-w-4xl'>
          {['All', 'IT', 'Business','Database'].map(major => (
            <button
            key={major}
            onClick={() => setMajorFilter(major)}
            className={`px-2 py-1 rounded-full text-xs md:px-3 md:py-2 md:text-base hover:bg-gray-200 ${majorFilter === major ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              {major}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/40 shadow-sm">
          <table className=" table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-lg text-left">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Name</th>
                <th className="px-4 py-3 font-medium truncate ">ID#</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                  Major
                </th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                  Date
                </th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-550">
              {currentStudents.map((student, index) => (
                <tr key={index} className="border-t border-gray-500/40">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <span className="truncate w-full">
                      {student.studentName}
                    </span>
                  </td>
                  <td className="px-4 py-3 ">{student.studentId}</td>
                  <td className="px-4 py-3 max-sm:hidden">{student.major}</td>
                  <td className="px-4 py-3 max-sm:hidden">{new Date(student.createdAt).toLocaleDateString('en-us',{
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
                    onClick={(e) => deleteStudent(student.id)}
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

export default Students



