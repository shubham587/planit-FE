import React, { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import NewTrip from './components/NewTrip'
import MyTrips from './components/MyTrips'
import DefaultLayout from './components/Layout'
import TripPage from './components/TripDetail'



const router = createBrowserRouter([
  {
    path: "/",
    element: < DefaultLayout/>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "newtrip",
        element: <NewTrip />,
      },
      {
        path: "trips",
        element: <MyTrips />,
      },
      {
        path :"tripdetails/:id",
        element: <TripPage />,
      }
    ]
  },
  
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}
export default App