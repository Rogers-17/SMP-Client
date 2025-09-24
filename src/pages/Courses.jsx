import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CourseList from './CourseList';
import { toast } from 'react-toastify';
import { AddCourse } from '../modals/AddCourses';

const AddCourses = () => {
   
  return (
    <>
      <div className='flex-1 flex flex-col justify-between'>
        <div className='flex justify-between w-full max-w-4xl'>
        <h2 className="pb-4 sm:text-lg md:text-xl font-medium">Courses</h2>
        <button onClick={AddCourse} className='bg-blue-500 p-1 text-center sm:text-lg md:text-xl text-white rounded mb-2'>
        Add +
        </button>
        </div>
    </div>
    <CourseList />
    </>
    
  )
}

export default AddCourses
