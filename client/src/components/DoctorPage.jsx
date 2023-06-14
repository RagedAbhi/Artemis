import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setDoc, setPatients } from '../state'
import './Res.css'
import Slider from './DocSlider'

const DoctorPage = () => {

    const dispatch = useDispatch()
    const docInfo = useSelector((state) => state.docInfo)
    const [patients, setPatientss] = useState("")
    const [fullName, setFullName] = useState("")

    const updateData = (docInfo) => {
        axios.post("http://localhost:3001/api/doctors/doctors-details", {
            employeeID: docInfo.employeeID,
        })
            .then((res) => {
                dispatch(setDoc({
                    docInfo: res.data
                }))
                setFullName(docInfo.fullName)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        updateData(docInfo)
    }, [])

    const speciality = useSelector((state) => state.docInfo.speciality)

    const updatePat = (speciality) => {
        axios.post("http://localhost:3001/api/doctors/patientGroup", {
            currentIllness: speciality,
        })
            .then((res) => {
                setPatientss(res.data)
                dispatch(setPatients({
                    patients: res.data
                }))
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        updatePat(speciality)
    }, [])

    return (
        <div className='flex bg-blue-400 max-w-screen-2xl' >
            <Navbar />
            <div className='h-screen w-screen flex flex-col mx-5 resPage'>
                <div className='h-20 border-b-2 border-black flex justify-between items-center'>
                    <div>
                        <p className='text-xl'>Good Morning, <span className='font-bold'>Dr. {fullName}</span></p>
                        <p className='text-xs text-white'>Only a life lived in the service to others is worth living</p>
                    </div>
                    <div className='flex justify-between items-center w-48'>
                        <div className='bg-yellow-500 w-12 h-12 rounded-full'></div>
                        <div className='bg-yellow-500 w-12 h-12 rounded-full'></div>
                        <div className='bg-yellow-500 w-16 h-16 rounded-full'></div>
                    </div>
                </div>
                <div className='h-1/4 flex justify-evenly items-center'>
                    <div className='bg-pink-200 h-4/5 w-1/6 rounded-2xl'></div>
                    <div className='bg-pink-200 h-4/5 w-1/6 rounded-2xl'></div>
                    <div className='bg-pink-200 h-4/5 w-1/6 rounded-2xl'></div>
                    <div className='bg-pink-200 h-3/5 w-1/4 rounded-2xl'></div>
                </div>
                <div className='h-1/4 bg-green-200 mt-10'>
                    <p>Recent patients</p>
                    <Slider type="Assigned" />
                </div>
                <div className='h-1/4 bg-orange-200 mt-10'>
                    <p>Patient Queue</p>
                    <Slider type="Not Assigned" />
                </div>
            </div>
        </div >
    )
}

export default DoctorPage
