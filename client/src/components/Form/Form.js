import React, {useState} from 'react'
import {Button,  TextField} from "@mui/material";

import {ColorRing} from 'react-loader-spinner'
import {useFormik} from "formik";
import * as yup from 'yup'
import * as emailjs from "emailjs-com";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .max(255)
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .required('Email is required'),
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    message: yup
        .string('Enter your Message')
        .required('Message is required'),
});


export default function Form() {

    const [loading, setLoading] = useState(false)
    const [sent, setSent] =useState(false)
    const [err, setErr] =useState(false)
    const [errMessage, setErrMessage] =useState(false)


    const formik = useFormik({
        initialValues:{
            name:'',
            email: '',
            message:''
        },
        validationSchema,
        onSubmit: (values)=>{

            setLoading(true)

            emailjs.send('service_5lq27v2', 'template_km57vcm', values, '5zxjb2IGERE8iKHRY')
                .then(res=>{
                    console.log(res)
                    setTimeout(() => {
                        setLoading(false)
                        setSent(true)
                    }, 1000)
                    setTimeout(() => {
                        setSent(false)
                    }, 10000)
                }).catch ((e)=> {
                setErr(true)
                setErrMessage(e.message)
                setLoading(false)
                setTimeout(()=>setErr(false),10000)
            })


        }
    })




    return(
        <>
            <form  className='contacts__message-form' onSubmit={formik.handleSubmit}>
                <TextField value={formik.values.name} onChange={formik.handleChange} margin='normal' name='name' id="outlined-basic" label="Your Name" variant="outlined" className = "message-input" />
                <TextField value={formik.values.email} onChange={formik.handleChange} margin='normal' name='email' id="outlined-basic" label="Email" variant="outlined" className = "message-input" />
                <TextField value={formik.values.message} onChange={formik.handleChange} margin='normal' multiline rows={5} name='message' id="outlined-basic" label="Massage" variant="outlined" className = "message-input" />
                <Button sx={{width: '200px'}} variant = "contained" size = "medium" type='submit'>Send A message</Button>
            </form>

            {loading && (<div className='l'><ColorRing
                visible
                height="100"
                width="100"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            /></div>)}
            {sent && (
                <div className='confirmation'><p>Email sent to Travel Ukraine customer service <br/> we will contact shortly</p> </div>
            )}
            {err && (
                <div className='confirmation'><p>Email is not sent, Failed with error  <br/> {errMessage} </p> </div>
            )}
        </>
    )
}