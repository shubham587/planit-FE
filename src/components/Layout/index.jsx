import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'


const DefaultLayout = () => {
    return (
        <div className=''>
            <div className='fixed w-full z-50'>
                <Navbar />
            </div>
            <div className='h-24'></div>
            <div className='w-10/12  m-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default DefaultLayout