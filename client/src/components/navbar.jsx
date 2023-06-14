import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const page = useSelector((state) => state.page)
    const isDoc = page === 'doctor'

    return (
        <div className='flex flex-col w-24 bg-blue-300 h-screen items-center justify-between'>
            <div className='bg-yellow-500 w-20 h-20 rounded-full mt-5'></div>
            <div className='flex flex-col justify-between items-center w-24 h-3/5'>
                <div className='bg-yellow-500 w-16 h-16 rounded-full'></div>
                <div className='bg-yellow-500 w-16 h-16 rounded-full'></div>
                <div className='bg-yellow-500 w-16 h-16 rounded-full'></div>
                <div className='bg-yellow-500 w-16 h-16 rounded-full'></div>
                <div className={!isDoc?'bg-yellow-500 w-16 h-16 rounded-full':'w-16 h-16 rounded-full'}></div>
                <div className={!isDoc?'bg-yellow-500 w-16 h-16 rounded-full':'w-16 h-16 rounded-full'}></div>
            </div>
            <div className='bg-yellow-500 w-20 h-20 rounded-full mb-5'></div>
        </div>
    )
}

export default Navbar
