import React, { useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { UseStudent } from '../helpers/StudentAuthContext';
import axios from 'axios'

const Setting = () => {

  const APiURl = "http://localhost:4000";
  const { studentState, loading } = UseStudent();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState(""); 
  const [college, setCollege] = useState(""); 
  const [role, setRole] = useState(""); 

  useEffect(() => {
    if(loading) return;
    if(!studentState) return;

    axios.get(`${APiURl}/api/students/byId/${studentState.id}`,
      {headers: {
        studentToken: localStorage.getItem("studentToken")
      },
    })
      .then((response) => {
        setStudentName(response.data.studentName);
        setStudentId(response.data.studentId);
        setCollege(response.data.major);
        setRole(response.data.role);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.success(error.error);
      })
    }, [loading, studentState])

  const handleSubmit =  async (e) => {
      e.preventDefault();

      Swal.fire({
          title: 'Are you sure?',
          text: 'Your password will be updated!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Update!'
      }).then((result) => {
        if(result.isConfirmed) {
          const data = { oldPassword: oldPassword, newPassword: newPassword}
            axios.put("http://localhost:4000/api/students/changepassword", data, {
              header: {
                studentToken: localStorage.getItem("studentToken")
              },      
            }).then((response) => {
              if (response.data.error){
                  toast.error(response.data.error);
              } else{
                  toast.success("Password Updated");
                  setOldPassword("");
                  setNewPassword("");
              }
          });
              }
      })

  }


  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium">Profile</h2>
        <p className='text-sm text-gray-600/80 pb-4'>Mange your settings here</p>
        {/*Personal Information Tabs*/}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl'>
            <div className='bg-white rounded-xl p-6 shadow border-t-8 border-blue-900 text-center'>
                <h2 className='text-center text-base md:text-lg mb-6 font-medium'>User Information</h2>
                <div className='flex flex-col items-center mb-6'>
                  <FaUserCircle className='md:w-14 md:h-14 h-10 w-10 text-blue-900'/>
                  <p className='text-base md:text-lg mt-6 font-medium'>{studentName}</p>
                  <p className='text-xs md:text-sm text-gray-700/90'>{studentId}</p>
                </div>
                <div className='space-y-2 text-gray-700 text-sm'>
                  <p><span className='font-medium text-lg'>ID Number:</span> {studentId}</p>
                  <p><span className='font-medium text-lg'>Department:</span> {college} College</p>
                  <p><span className='font-medium text-lg'>Role:</span> {role}</p>
                </div>
            </div>
          {/* Password Update Tab */}
            <div className='bg-white rounded-xl p-6 shadow border-t-8 border-blue-900 text-center'>
                <h2 className='text-center text-base md:text-lg mb-6 font-medium'>Update Password</h2>
                <form className='space-y-4' onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="old-password"
                    className='block text-sm mb-1 text-gray-700'>Old Password</label>
                    <input 
                    type="password"
                    id='old-password'
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    required 
                    />
                  </div>
                  <div>
                    <label htmlFor="new-password"
                    className='block text-sm mb-1 text-gray-700'>New Password</label>
                    <input 
                    type="password"
                    id='new-password'
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    required 
                    />
                  </div>
                  <div>
                    <button type='submit'
                    className='px-8 py-2.5 rounded text-white bg-blue-900 font-medium'>
                      Update Password
                    </button>
                  </div>
                </form>
            </div>
        {/** Other Information Tab */}
            <div className='col-span-1 md:col-span-2 bg-white rounded-xl p-6 shadow border-t-8 border-blue-900 text-center'>
              <h2 className='text-center text-xl md:text-2xl font-medium mb-2'>Other Informations</h2>
              <p className='text-gray-700/90 text-lg md:text-base text-center'>Additional content or manager details go here</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
