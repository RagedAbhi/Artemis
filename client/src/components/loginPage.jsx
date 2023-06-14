import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setDoc, setPat } from '../state'

const LoginPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const page = useSelector((state) => state.page)
    const isDoc = page === 'doctor'

    const [pageType, setPageType] = useState("login")
    const isLogin = pageType === "login"

    const back = () => {
        navigate("/")
    }

    const [data, setData] = useState()
    const handleChange = (e) => {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const submit = async (e) => {
        e.preventDefault();

        if (isDoc) {
            await axios.post('http://localhost:3001/api/doctors/login', {
                "employeeID": data.email,
                "password": data.password
            })
                .then(res => {
                    dispatch(setDoc({
                        docInfo: res.data
                    }))
                    navigate("/doctorPage")
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            if (isLogin) {
                await axios.post('http://localhost:3001/api/patients/login', {
                    "email": data.email,
                    "password": data.password
                })
                    .then(res => {
                        dispatch(setPat({
                            patInfo: res.data
                        }))
                        navigate("/patientPage")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                await axios.post('http://localhost:3001/api/patients/signup', {
                    "fullName": data.name,
                    "email": data.email,
                    "password": data.password
                })
                    .then(res => {

                        setPageType("login")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }

    return (
        <div className="bg-blue-600 h-screen flex flex-col items-center">
            <div className='h-1/5 w-screen'>
                <h1 className="font-mono text-4xl text-yellow-500 pl-5 pt-4">Artemis</h1>
            </div>
            <div className="bg-white h-3/5 w-2/3 rounded-3xl flex">
                <div className={isDoc ? "w-1/2 bg-green-400" : "w-1/2 bg-orange-400"}>
                    <button className="rounded-l-3xl ml-3 mt-3" onClick={back}>BACK</button>
                </div>
                <div className={isLogin ? `w-1/2 flex flex-col justify-between mr-14 mb-16` : `w-1/2 flex flex-col justify-between mr-14 mb-5`}>
                    <div className="h-12 flex justify-start items-center border-b-red-500 border-b-2">
                        <button className={isLogin ? 'px-5 font-bold text-sm h-11 rounded-lg bg-blue-100' : 'px-5 font-bold text-sm h-11 rounded-lg'} onClick={() => setPageType("login")}>Login</button>
                        {!isDoc &&
                            <button className={isLogin ? 'px-5 font-bold text-sm h-11 rounded-lg' : 'px-5 font-bold text-sm h-11 rounded-lg bg-blue-100'} onClick={() => setPageType("register")}>Register</button>}
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold'>Welcome to Artemis</h1>
                        <p className='text-xs font-thin mt-2'>
                            {isLogin ?
                                "Login to your account" :
                                "Register yourself"
                            }
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        {!isLogin &&
                            <div>
                                <label className='mb-2'>Name</label>
                                <input className='bg-blue-300 w-full rounded-lg h-8' type="text" name="name" id="name" onChange={(e) => handleChange(e)} />
                            </div>
                        }
                        <div>
                            <label className='mb-2'>
                                {isDoc ?
                                    "Employee ID" :
                                    "Email"
                                }
                            </label>
                            <input className='bg-blue-300 w-full rounded-lg h-8' type="text" name="email" id="email" onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <label className='mb-2'>Password</label>
                            <input className='bg-blue-300 w-full rounded-lg h-8' type="password" name="password" id="password" onChange={(e) => handleChange(e)} />
                        </div>
                        <button type='submit' className='w-1/5 bg-blue-900 text-white h-10 rounded-lg my-3'>
                            {isLogin ?
                                "Log In" :
                                "Sign Up"
                            }
                        </button>
                    </form>

                    <div className="flex">
                        <span className='font-medium text-sm'>
                            {isLogin ?
                                "Login using" :
                                "Register your account with"
                            }
                        </span>
                        <div className="bg-green-300 w-5 rounded-xl ml-4"></div>
                        <div className="bg-blue-400 w-5 rounded-xl ml-4"></div>
                        <div className="bg-orange-400 w-5 rounded-xl ml-4"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
