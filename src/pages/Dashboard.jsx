import React from 'react'
import Dashboardstat from './DashboardStats'

const Dashboard = () => {

  return (
    <>
    <div className="flex-1 min-h-screen flex flex-col">
        <h2 className="pb-4 text-xl font-medium">Dashboard</h2>
        <Dashboardstat />
    </div>
    </>
  )
}

export default Dashboard



