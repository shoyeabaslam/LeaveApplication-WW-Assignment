import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import LeaveApplicationForm from './pages/LeaveApplicationForm/LeaveApplicationForm.tsx'
import ManagementLogin from './pages/ManagementLogin/ManagementLogin.tsx'
import ViewLeaveRequests from './pages/ViewLeaveRequests/ViewLeaveRequests.tsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='management-login' element={<ManagementLogin/>}/>
      <Route path='leave-application' element={<LeaveApplicationForm/>}/>
      <Route path='view-leaves' element={<ViewLeaveRequests/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>,
)
