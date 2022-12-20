import React, { useState } from 'react';
import { Button, styled } from '@mui/material';
import { TextField } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { AlertModal } from '../../../../components';

const TextFieldContactsPersonData = styled(Field)(({ theme }) => ({
  marginRight: '10px',
  width: '270px',

  [theme.breakpoints.up('tablet')]: {
    width: '280px',
  },
  [theme.breakpoints.up('laptop')]: {
    width: '300px',
  },
}));

const TextFieldContacts = styled(Field)(({ theme }) => ({
  width: '350px',
  display: 'block',

  [theme.breakpoints.up('tablet')]: {
    width: '570px',
  },
  [theme.breakpoints.up('laptop')]: {
    width: '610px',
  },
}));

const ContactsForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    setIsModalOpen(true);
    resetForm();
  };

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const schema = yup.object().shape({
    name: yup.string('Enter your Name').required('Name is required'),
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    message: yup.string('Enter your Message').required('Message is required'),
  });

  const modalSubmit = () => {
    closeModal();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <TextFieldContactsPersonData component={TextField} name="name" label="Name" margin="normal" />
          <TextFieldContactsPersonData component={TextField} name="email" label="Email" margin="normal" />
          <TextFieldContacts
            component={TextField}
            name="message"
            label="Message"
            multiline
            fullWidth
            margin="normal"
            rows={8}
          />

          <Button margin="normal" sx={{ display: 'block', marginTop: '15px' }} color="primary" type="submit">
            Send
          </Button>
          <AlertModal
            open={isModalOpen}
            title="Success"
            success
            submitButtonText="OK"
            disableCancelButton
            onClose={closeModal}
            onSubmit={modalSubmit}
          >
             Thank you for your message. we will write you as soon as possible!
          </AlertModal>
        </Form>
      )}
    </Formik>
  );
};

export default ContactsForm;
