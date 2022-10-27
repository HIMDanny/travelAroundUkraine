import React, {useState ,useRef} from 'react'
import {Button, FormGroup, TextField} from "@mui/material";
import  emailjs from "emailjs-com";
import {ColorRing} from 'react-loader-spinner'

export default function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [sent, setSent] =useState(false)

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true)

        emailjs.sendForm('service_5lq27v2', 'template_km57vcm', form.current, '5zxjb2IGERE8iKHRY').then((res)=>{
            // eslint-disable-next-line no-console
            console.log(res)
            setMessage('')
            setName('')
            setEmail('')
            setTimeout(() => {
                setLoading(false)
                setSent(true)
            },1000)
            setTimeout(()=>{
                setSent(false)
            },10000)
        })

    };
    return(
        <>
            <FormGroup className='contacts__message-form'>
                <TextField value={name} onChange={(e)=>setName(e.target.value)} margin='normal' name='name' id="outlined-basic" label="Your Name" variant="outlined" className = "message-input" />
                <TextField value={email} onChange={(e)=>setEmail(e.target.value)} margin='normal' name='email' id="outlined-basic" label="Email" variant="outlined" className = "message-input" />
                <TextField value={message} onChange={(e)=>setMessage(e.target.value)} margin='normal' multiline rows={5} name='message' id="outlined-basic" label="Massage" variant="outlined" className = "message-input" />
                <Button sx={{width: '200px'}} variant = "contained" size = "medium" onClick = {(e)=> sendEmail(e)}>Send A message</Button>
            </FormGroup>
            <form style={{display:'none'}} ref={form} action="">
                <input type="text" value={name} name='name'/>
                <input type="text" value={email} name='email'/>
                <input type="text" value={message} name='message'/>
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
        </>
    )
}