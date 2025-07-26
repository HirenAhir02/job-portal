import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Compnies from './components/admin/Compnies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/Jobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ProtectDetail from './components/ProtectDetail'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
   {
    path:'/login',
    element:<Login/>  
  },
   {
    path:'/signup',
    element:<Signup/>
  },
   {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element: <ProtectDetail> <JobDescription/> </ProtectDetail>
  },
   {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },

  //admin side 
  {
    path:'/admin/companies',
    element:<ProtectedRoute> <Compnies/>  </ProtectedRoute>
  },
   {
    path:'/admin/companies/create',
    element: <ProtectedRoute> <CompanyCreate/> </ProtectedRoute>
  },
   {
    path:'/admin/companies/:id',
    element:<ProtectedRoute>  <CompanySetup/>  </ProtectedRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectedRoute>  <AdminJobs/>  </ProtectedRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectedRoute>  <PostJob/>  </ProtectedRoute>
  },
   {
    path:'/admin/jobs/:id/applicatns',
    element: <ProtectedRoute> <Applicants/> </ProtectedRoute>
  },
   
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={appRouter} />  
    </>
  )
}

export default App
