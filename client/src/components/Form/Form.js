import React, {useState} from 'react';
import {Button, TextField, Alert, AlertTitle, styled} from '@mui/material';

import {ColorRing} from 'react-loader-spinner';
import {useFormik} from 'formik';
import * as yup from 'yup';
import * as emailjs from 'emailjs-com';

const AlertMessage = styled((props) => <Alert {...props}/>)(({theme}) => ({
  [theme.breakpoints.up('tablet')]: {
    width: '30%',
    maxWidth: '400px',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    borderRadius: '20px',
    border: '1px solid rgba(0, 75, 252, 0.04)',
    padding: '10px 20px',
  }

}))
const LoaderContainer =  styled('div')(() => ({
  position: 'fixed',
  top:'50%',
  left:'50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(40, 44, 52, 0.37)',
  height: '100vh',
  width: '100vw',
  objectFit: 'initial',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex:'5000'
}))






const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .max(255)
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
    .required('Email is required'),
  name: yup.string('Enter your name').required('Name is required'),
  message: yup.string('Enter your Message').required('Message is required'),
});

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      emailjs
        .send('service_5lq27v2', 'template_km57vcm', values, '5zxjb2IGERE8iKHRY')
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            setSent(true);
          }, 1000);
          setTimeout(() => {
            setSent(false);
          }, 10000);
        })
        .catch((e) => {
          setErr(true);
          setErrMessage(e.message);
          setLoading(false);
          setTimeout(() => setErr(false), 10000);
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          value={formik.values.name}
          onChange={formik.handleChange}
          margin="normal"
          name="name"
          id="outlined-basic"
          label="Your Name"
          variant="outlined"
          className="message-input"
        />
        <TextField
          value={formik.values.email}
          onChange={formik.handleChange}
          margin="normal"
          name="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="message-input"
        />
        <TextField
          value={formik.values.message}
          onChange={formik.handleChange}
          margin="normal"
          multiline
          rows={5}
          name="message"
          id="outlined-basic"
          label="Massage"
          variant="outlined"
          className="message-input"
        />
        <Button sx={{width: '250px'}}  size="medium" type="submit">
          Send A message
        </Button>
      </form>

      {loading && (
        <LoaderContainer>
          <ColorRing
            visible
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </LoaderContainer>
      )}
      {sent && (
        <AlertMessage severity="info" >
          <AlertTitle>Sent</AlertTitle>
          Email sent to Travel Ukraine customer service <br/> we will contact shortly
        </AlertMessage>
      )}
      {err && (
        <AlertMessage severity='error' >
          <AlertTitle>Your message was not sent</AlertTitle>
          Email is not sent, Failed with error <br/> {errMessage}{' '}
        </AlertMessage>
      )}
    </>
  );
}
