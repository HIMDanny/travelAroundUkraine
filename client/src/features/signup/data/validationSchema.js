import * as yup from 'yup';
import formModel from './formModel';

const { firstName, lastName, login, email, password, retypePassword } = formModel;

export default [
  yup.object().shape({
    [firstName.name]: yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: yup.string().required(`${lastName.requiredErrorMsg}`),
  }),

  yup.object().shape({
    [email.name]: yup.string().email(`${email.invalidErrorMsg}`).required(`${email.requiredErrorMsg}`),
    [login.name]: yup.string().required(`${login.requiredErrorMsg}`),
    [password.name]: yup
      .string()
      .min(3, 'Password must be minimum of 3 symbols')
      .max(12, 'Password must be maximum of 12 symbols')
      .required(`${password.requiredErrorMsg}`),

    [retypePassword.name]: yup
      .string()
      .oneOf([yup.ref('password')], `${retypePassword.invalidErrorMsg}`)
      .required(`${retypePassword.requiredErrorMsg}`),
  }),
];
