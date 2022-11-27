/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Stepper, StepLabel, Step, Button, Box, CircularProgress } from '@mui/material';
import { Formik, Form } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enAU } from 'date-fns/locale';

import { initialValues, validationSchema } from '../../data';
import { UserInfoForm, LoginInfoForm, SignupSuccess } from '..';

const steps = ['User Info', 'Login Info'];

const SignupForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const lastStep = steps.length - 1;

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const formSubmitHandler = (values, { setSubmitting }) => {
    setTimeout(() => {
      nextStep();
      setSubmitting(false);
    }, 2000);

    // console.log(values);
  };

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep !== steps.length ? (
        <Formik initialValues={initialValues} validationSchema={currentValidationSchema} onSubmit={formSubmitHandler}>
          {({ isSubmitting }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enAU}>
              <Form>
                {activeStep === 0 && <UserInfoForm />}
                {activeStep === 1 && <LoginInfoForm />}

                <Box sx={{ display: 'flex', justifyContent: 'center', columnGap: 3, position: 'relative' }}>
                  {activeStep !== 0 && !isSubmitting && <Button onClick={previousStep}>Back</Button>}

                  {!isSubmitting ? (
                    <Button disabled={isSubmitting} type="submit">
                      {activeStep !== lastStep ? 'Continue' : 'Sign up'}
                    </Button>
                  ) : (
                    <CircularProgress
                      size={50}
                      sx={{
                        color: 'primary.dark',
                      }}
                    />
                  )}
                </Box>
              </Form>
            </LocalizationProvider>
          )}
        </Formik>
      ) : null}

      <SignupSuccess activeStep={activeStep} steps={steps} />
    </>
  );
};

export default SignupForm;