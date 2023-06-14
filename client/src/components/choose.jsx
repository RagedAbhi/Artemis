import React from 'react'
import { useDispatch } from 'react-redux'
import { setPage } from '../state'
import { useNavigate } from 'react-router-dom'

const Choose = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const setDoctor = () => {
        dispatch(setPage({
            page: 'doctor',
        }))
        navigate("/loginPage")
    }

    const setPatient = () => {
        dispatch(setPage({
            page: 'patient'
        }))
        navigate("/loginPage")
    }


    return (
        <div className='bg-blue-600 h-screen flex flex-col items-center'>
            <div className='h-1/5 w-screen'>
                <h1 className="font-mono text-4xl text-yellow-500 pl-5 pt-4">Artemis</h1>
            </div>
            <div className='flex flex-col'>
                <p className='font-semibold text-3xl text-yellow-100 text-center'>You are signing in as ...</p>
                <div className='flex mt-20 w-screen justify-evenly'>
                    <button className="bg-green-400 w-48 h-48 rounded-2xl ml-14 text-center" onClick={setDoctor}>
                        Doctor
                    </button>
                    <button className="bg-orange-400 w-48 h-48 rounded-2xl mr-14 text-center" onClick={setPatient}>
                        Patient
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Choose
