import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setDoctors, setPat } from '../state'
import Slider from './PatSlider'
import axios from 'axios'

const PatientPage = () => {

    const dispatch = useDispatch()
    const patInfo = useSelector((state) => state.patInfo)
    const [doctors, setDoctorss] = useState("")
    const fullName = patInfo.fullName

    const updateData = (patInfo) => {
        axios.post("http://localhost:3001/api/patients/patient-details", {
            email: patInfo.email,
            fullName: patInfo.fullName
        })
            .then((res) => {
                dispatch(setPat({
                    patInfo: res.data
                }))
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        updateData(patInfo)
    }, [])

    const currentIllness = useSelector((state) => state.patInfo.currentIllness)

    const updateDoc = (currentIllness) => {
        axios.post("http://localhost:3001/api/patients/doctorGroup", {
            speciality: currentIllness,
        })
            .then((res) => {
                setDoctorss(res.data)
                dispatch(setDoctors({
                    doctors: res.data
                }))
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        updateDoc(currentIllness)
    }, [])

    return (
        <div className='flex bg-blue-400'>
            <Navbar />
            <div className='h-screen flex flex-col mx-5'>
                <div className='h-20 border-b-2 border-black flex justify-between items-center'>
                    <div>
                        <p className='text-xl'>Welcome, <span className='font-bold'>Mr. {fullName}</span></p>
                        <p className='text-xs text-white'>Only a life lived in the service to others is worth living</p>
                    </div>
                    <div className='flex justify-between items-center w-48'>
                        <div className='bg-yellow-500 w-12 h-12 rounded-full'></div>
                        <div className='bg-yellow-500 w-12 h-12 rounded-full'></div>
                        <div className='bg-yellow-500 w-16 h-16 rounded-full'></div>
                    </div>
                </div>
                <button className='border-4 w-2/5 rounded-lg mt-5 bg-slate-200'>Take a quick diagnostic quiz</button>
                <div className='h-1/3 bg-green-200 mt-10'>
                    <p>Currently Available Specialists</p>
                    <Slider type="Online" />
                </div>
                <div className='h-1/3 bg-orange-200 mt-10'>
                    <p>Our Best Specialists</p>
                    <Slider type="Offline" />
                </div>
            </div>
        </div>
    )
}

export default PatientPage
