import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import LeaveApplicationForm from './pages/LeaveApplicationForm/LeaveApplicationForm.tsx'
import ViewLeaveRequests from './pages/ViewLeaveRequests/ViewLeaveRequests.tsx'
import UserProvider from './context/UserProvider.tsx'
import { ToastContainer } from 'react-toastify'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='leave-application' element={<LeaveApplicationForm/>}/>
      <Route path='view-leaves' element={<ViewLeaveRequests/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      <RouterProvider router={routes}/>
    </UserProvider>
  </React.StrictMode>,
)
