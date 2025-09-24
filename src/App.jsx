import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
  Dashboard, Students, Courses, Reports, Setting,
  Profile, Login, MainLayout, CreateUser, ActivityLog
} from './pages/index'
import {
  StudentsDashboard, GradeSheets, PlanCourses, StudentsProfile,
  Requests, StudentsSettings, StudentLogin, StudentMainLayout, UpcomingDates,
} from './studentPages/index'

import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
    <ToastContainer />
  <Routes>
    
    {/** Default Route */}
    <Route path='/' element={<Navigate to="student/login"/>}/>

      {/**Public admin Route */}
      <Route path='/admin/login' element={<Login />} />
      <Route path="/admin/create" element={<CreateUser />} />

    {/**Public student Route */}
    <Route path='/student/login' element={<StudentLogin/>}/>


    {/**Protected Student Route */}
    <Route element={<StudentMainLayout />}>
    <Route path="/student/dashboard"element={<StudentsDashboard />}/> 
    <Route path="/student/gradesheet"element={<GradeSheets />}/>
    <Route path="/student/plancourses"element={<PlanCourses />}/>
    <Route path="/student/profile"element={<StudentsProfile />}/>
    <Route path="/student/requests"element={<Requests />}/>
    <Route path="/student/settings"element={<StudentsSettings />}/>
    <Route path="/student/dashboard/upcoming-dates" element={<UpcomingDates />} />
    </Route>

      {/**Proctected Admin Routes*/}
      <Route element={<MainLayout />}>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard/courses" element={<Courses />} />
      <Route path="/admin/dashboard/students" element={<Students />} />
      <Route path="/admin/dashboard/reports" element={<Reports />} />
      <Route path="/admin/dashboard/setting" element={<Setting />} />
      <Route path="/admin/dashboard/profile" element={<Profile />} />
      <Route path="/admin/dashboard/activities" element={<ActivityLog />} />
      </Route>
    </Routes>
    </>

    
    
  )
}

export default App
