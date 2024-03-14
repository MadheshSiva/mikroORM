import React, { useEffect, useState } from "react";
import wall_login from "../images/login-wall.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { endPoints } from "../API";
import {useNavigate} from "react-router-dom"
import axios from "axios";


const SignUp = () => {
    const [view, setView] = useState(false)
    const [login, setLogin] = useState({
        user_name: "",
        email: "",
        password: ""
    })
     const navigate = useNavigate()
    const [errHanding, setErrHanding] = useState({
        user_name: false,
        email: false,
        password: false
    })
    const viewPass = () => {
        if ('visibity') {
            setView(!view)
        } else {
            setView(!view)
        }

    }

    const loginSubmit = async() => {
        console.log(login, "login21")
        if (login.email == '' || login.password == '' || login.user_name == '') {
            login.email == '' && setErrHanding((prev) => ({ ...prev, email: true }))
            login.password == '' && setErrHanding((prev) => ({ ...prev, password: true }))
            login.user_name == '' && setErrHanding((prev) => ({ ...prev, user_name: true }))

        } else {
            await axios.post(`${endPoints.sign_up}`,login).then((res) => {
               navigate('/login')
            }).catch((err) => {
               console.log({message : err.message})
            })
        }
    }

    useEffect(() => {
        login.user_name !== '' && setErrHanding((prev) => ({ ...prev, user_name: false }))
        login.email !== '' && setErrHanding((prev) => ({ ...prev, email: false }));
        login.password !== '' && setErrHanding((prev) => ({ ...prev, password: false }))

    }, [login])
    return (
        <>
            <div className="relative">
                <img src={wall_login} alt="login_image" className="h-[100vh] w-full opacity-25" />
                <div className="absolute inset-0 top-40 w-[30%] mx-auto border p-2 bg-[#333330] h-[33rem] rounded-lg shadow-[#e4e80e] shadow-lg">
                    <div className="w-full pl-4">
                        <h1 className="my-3 text-lg font-bold text-[#e4e80e]">User Name</h1>
                        <input type='text' placeholder="Please enter your email" className="border border-[#e4e80e] rounded-lg w-4/5 h-12 pl-2 capitalize" onChange={(e) => setLogin((prev) => ({ ...prev, user_name: e.target.value }))} />
                        {errHanding.user_name && <h1 className="text-red-500">Please enter your Name*</h1>}
                    </div>

                    <div className="w-full pl-4">
                        <h1 className="my-3 text-lg font-bold text-[#e4e80e]">Email</h1>
                        <input type='email' placeholder="Please enter your email" className="border border-[#e4e80e] rounded-lg w-4/5 h-12 pl-2" onChange={(e) => setLogin((prev) => ({ ...prev, email: e.target.value }))} />
                        {errHanding.email && <h1 className="text-red-500">Please enter your email*</h1>}
                    </div>

                    <div className="pl-4">
                        <h1 className="my-3 text-lg font-bold text-[#e4e80e]">Password</h1>
                        <div>
                            <input type={view ? "text" : "password"} placeholder="Please enter your email" className="border border-[#e4e80e] rounded-lg w-4/5 h-12 pl-2" onChange={(e) => setLogin((prev) => ({ ...prev, password: e.target.value }))} />
                            {view ? <button onClick={() => viewPass('visibity')} className="ml-2"><Visibility className="text-[#e4e80e]" /></button> : <button onClick={() => viewPass('visibleOff')} className="ml-2"><VisibilityOff className="text-[#e4e80e]" /></button>}
                            {errHanding.password && <h1 className="text-red-500">Please enter your password*</h1>}
                        </div>


                    </div>
                    <div className="pl-4">
                        <button className="w-4/5 mx-auto mt-10 border transition duration-300 text-[#333330] py-2 rounded-lg bg-[#e4e80e] text-lg font-semibold border-[#e4e80e] hover:text-[#e4e80e] hover:shadow-inner hover:shadow-[#e4e80e] hover:bg-[#333330]" onClick={() => loginSubmit()}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default SignUp;