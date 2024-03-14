import React, { useEffect, useState } from "react";
import {endPoints} from "../API";
import axios from "axios";
import {useLocation,useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
const StudentForms = () => {
    const [form, setForm] = useState({
        student_name: "",
        dob: "",
        age: "",
        subject_1: "",
        mark_1: "",
        subject_2: "",
        mark_2: "",
        created_user : "",
        updated_user : "",
    
    })
    const location = useLocation()
    const navigate = useNavigate()
    const path = useParams()
     console.log(path,"path20")
    const list = useSelector((state) => state.students)
    console.log(list,"list20")
    const data = location?.state?.id
    const type = location?.state?.type
    console.log(location,"loca16")
     useEffect(() => {
        console.log(path.validation,"validaiton29")
        if (path.validation == "update") {
            setForm((prev) => ({...prev,updated_user : list.data.user_name}))
        } else {
            setForm((prev) => ({...prev,created_user : list.data.user_name}))
        }
        
     },[path])
     console.log(form,"form37")
    const [errhanding,setErrHanding] = useState({
        student_name: false,
        DOB: false,
        Age: false,
        Subject_1: false,
        Mark_1: false,
        Subject_2: false,
        Mark_2: false
    })
    console.log(form,"form48")
    const onSubmit = () => {

        console.log(form, "form17")
        if (form.student_name == '' || form.DOB == '' || form.Age == '' || form.Subject_1 == '' || form.Mark_1 == '' || form.Subject_2 == '' || form.Mark_2 == '' ) {
           
       form.student_name == '' && setErrHanding((prev) => ({...prev,student_name : true}))
       form.age =='' && setErrHanding((prev) => ({...prev,Age : true})) 
       form.dob =='' && setErrHanding((prev) => ({...prev,DOB : true}))
       form.mark_1 =='' && setErrHanding((prev) => ({...prev,Mark_1 : true}))
       form.subject_1 == '' && setErrHanding((prev) => ({...prev,Subject_1 : true}))
       form.subject_2 == '' && setErrHanding((prev) => ({...prev,Subject_2 : true}))
       form.mark_2 == '' && setErrHanding((prev) => ({...prev,Mark_2 : true})) 

        } else {
        //    alert(form.studentName)
           axios.post(endPoints.create_records,form).then((res) => {
             console.log(res,"res40")
             if(res) {
                   navigate(-1)
             }
           }).catch((err) => {
               console.log({message : err.message})
           })
        }
    }

    const onEdit = async() => {
     
        if (form.student_name == '' || form.DOB == '' || form.Age == '' || form.Subject_1 == '' || form.Mark_1 == '' || form.Subject_2 == '' || form.Mark_2 == '' ) {
           
            form.student_name == '' && setErrHanding((prev) => ({...prev,student_name : true}))
            form.age =='' && setErrHanding((prev) => ({...prev,Age : true})) 
            form.dob =='' && setErrHanding((prev) => ({...prev,DOB : true}))
            form.mark_1 =='' && setErrHanding((prev) => ({...prev,Mark_1 : true}))
            form.subject_1 == '' && setErrHanding((prev) => ({...prev,Subject_1 : true}))
            form.subject_2 == '' && setErrHanding((prev) => ({...prev,Subject_2 : true}))
            form.mark_2 == '' && setErrHanding((prev) => ({...prev,Mark_2 : true})) 
     
             } else {
             //    alert(form.studentName)
            //  console.log(form,"from87")
             await axios.patch(`${endPoints.update_record}/${data?.id}`,form).then((res) => {
                  
                  if(res) { 
                       navigate(-1)
                  }
                }).catch((err) => {
                    console.log({message : err.message})
                })
             }
        
    }
      useEffect(() => {
       form.student_name !== '' && setErrHanding((prev) => ({...prev,student_name : false}))
       form.age !=='' && setErrHanding((prev) => ({...prev,Age : false})) 
       form.dob !=='' && setErrHanding((prev) => ({...prev,DOB : false}))
       form.mark_1 !=='' && setErrHanding((prev) => ({...prev,Mark_1 : false}))
       form.subject_1 !== '' && setErrHanding((prev) => ({...prev,Subject_1 : false}))
       form.subject_2 !== '' && setErrHanding((prev) => ({...prev,Subject_2 : false}))
       form.mark_2 !== '' && setErrHanding((prev) => ({...prev,Mark_2 : false}))    
    },[form])
    console.log(form, "from20")
    useEffect(() => {
        if (type == 'edit') {
            if (path.validation == "update") {
                setForm({
                    student_name: data?.student_name ,
                    dob: data?.dob,
                    age: data?.age,
                    subject_1: data?.subject_1,
                    mark_1: data?.mark_1,
                    subject_2: data?.subject_2,
                    mark_2: data?.mark_2,
                    updated_user : list.data.user_name  
                })
            } else {
                setForm({
                    student_name: data?.student_name ,
                    dob: data?.dob,
                    age: data?.age,
                    subject_1: data?.subject_1,
                    mark_1: data?.mark_1,
                    subject_2: data?.subject_2,
                    mark_2: data?.mark_2,
                    created_user : list.data.user_name  
                })
            }
            
        }  
       
    },[])
    return (
        <>
        <div className="w-4/5 mx-auto">
        <div className="mt-10">
            <h1 className="text-2xl font-bold"><span className="text-[#e4e80e]  border-b border-[#333330]">{type == 'edit'? 'Update' : 'Upload'}</span> your Lists</h1>
        </div>
            <from >
                <div className="flex items-center mt-8 gap-2">
                <div className="w-1/2  ">
                    <h1 className="text-xl font-semibold my-2 ml-1">Student Name</h1>
                    <input type="text" placeholder="Please enter your Name" className="border-2 rounded-lg border-[#e4e80e] w-4/5 h-12 pl-2 capitalize" onChange={(e) => setForm((prev) => ({ ...prev, student_name: e.target.value }))} value={form.student_name}/>
                   {errhanding.studentName && <h1 className="ml-2 text-red-500">Please enter your Name*</h1>} 
                </div>
                <div className="w-1/2 ">
                    <h1 className="text-xl font-semibold my-2 ml-1">DOB</h1>
                    <input type="date" placeholder="Choose your DOB" className="border-2 rounded-lg border-[#e4e80e] w-4/5 h-12 pl-2" onChange={(e) => setForm((prev) => ({ ...prev, dob: e.target.value }))} value={form.dob}/>
                   {errhanding.DOB && <h1 className="ml-2 text-red-500">Please enter your DOB*</h1>} 
                </div>
                </div>
                <div className="flex items-center my-4 gap-2">
                <div className="w-1/2">
                    <h1 className="text-xl font-semibold my-2 ml-1">Age</h1>
                    <input type="text" placeholder="Please enter your Age" className="border-2 rounded-lg border-[#e4e80e] w-4/5 h-12 pl-2" onChange={(e) => setForm((prev) => ({ ...prev, age: e.target.value }))} value={form.age}/>
                  {errhanding.Age &&  <h1 className="ml-2 text-red-500">Please enter your Age*</h1>} 
                </div>
                <div className="w-1/2">
                    <h1 className="text-xl font-semibold my-2 ml-1">Subject 1</h1>
                    <input type="text" placeholder="Please enter your Subject 1" className="border-2 rounded-lg border-[#e4e80e] w-4/5 h-12 pl-2 capitalize" onChange={(e) => setForm((prev) => ({ ...prev, subject_1: e.target.value }))} value={form.subject_1}/>
                   {errhanding.Subject_1 && <h1 className="ml-2 text-red-500">Please enter your Subject 1*</h1>} 
                </div>
                </div>
                <div className="flex items-center my-4 gap-2">
                <div className="w-1/2">
                    <h1 className="text-xl font-semibold my-2 ml-1" >Mark 1</h1>
                    <input type="text" placeholder="Please enter your Mark 1" className="border-2 rounded-lg border-[#e4e80e] w-4/5 h-12 pl-2" onChange={(e) => setForm((prev) => ({ ...prev, mark_1: e.target.value }))} value={form.mark_1}/>
                   {errhanding.Mark_1 && <h1 className="ml-2 text-red-500">Please enter your Mark 1*</h1>} 
                </div>
                <div className="w-1/2">
                    <h1 className="text-xl font-semibold my-2 ml-1">Subject 2</h1>
                    <input type="text" placeholder="Please enter your Subject 2" className="border-2 rounded-lg border-[#e4e80e] w-4/5 h-12 pl-2 capitalize" onChange={(e) => setForm((prev) => ({ ...prev, subject_2: e.target.value }))} value={form.subject_2}/>
                    {errhanding.Subject_2 && <h1 className="ml-2 text-red-500">Please enter your Subject 2*</h1>}
                </div>
                </div>
                <div className="my-3 w-1/2">
                    <h1 className="text-xl font-semibold my-2 ml-1">Mark 2</h1>
                    <input type="text" placeholder="Please enter your Mark 2" className="border-2 rounded-lg border-[#e4e80e] w-4/5 h-12 pl-2" onChange={(e) => setForm((prev) => ({ ...prev, mark_2: e.target.value }))} value={form.mark_2}/>
                   {errhanding.Mark_2 && <h1 className="ml-2 text-red-500">Please enter your Mark 2*</h1>}     
                </div>
                <div className="w-full  flex justify-center mt-6 ml-1">
                <button onClick={() => 
                    type == 'edit' ? 
                    onEdit() :
                    onSubmit()} className="transition duration-200 bg-[#e4e80e] px-6 py-1 text-lg rounded-md hover:text-[#e4e80e] hover:bg-[#333330] font-semibold ">{type == 'edit' ? 'Update' : 'Submit'}</button>
                </div>
            </from>
            </div>
        </>
    )

}

export default StudentForms;