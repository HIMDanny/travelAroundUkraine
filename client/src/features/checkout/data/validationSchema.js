import * as yup from 'yup';
import valid from 'card-validator';
import formModel from './formModel';

const {
  firstName,
  lastName,
  email,
  phone,
  addressOne,
  city,
  zipcode,
  country,
  cardType,
  nameOnCard,
  cardNumber,
  expiryDate,
  cvv,
} = formModel;

const visaRegEx = /^[0-9]{3,4}$/;

export default [
  yup.object().shape({
    [firstName.name]: yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: yup.string().required(`${lastName.requiredErrorMsg}`),
    [email.name]: yup.string().email(`${email.invalidErrorMsg}`).required(`${email.requiredErrorMsg}`),
    [phone.name]: yup.number().required(`${phone.requiredErrorMsg}`),
  }),

  yup.object().shape({
    [addressOne.name]: yup.string().required(`${addressOne.requiredErrorMsg}`),
    [city.name]: yup.string().required(`${city.requiredErrorMsg}`),
    [zipcode.name]: yup.number().required(`${zipcode.requiredErrorMsg}`),
    [country.name]: yup.string().required(`${country.requiredErrorMsg}`),
  }),

  yup.object().shape({
    [cardType.name]: yup.string().required(`${cardType.requiredErrorMsg}`),
    [nameOnCard.name]: yup.string().required(`${nameOnCard.requiredErrorMsg}`),
    [cardNumber.name]: yup
      .string()
      .test('card number test', 'Credit card number is invalid.', (value) => valid.number(value).isValid)
      .required(`${cardNumber.requiredErrorMsg}`),
    [expiryDate.name]: yup.string().required(`${expiryDate.requiredErrorMsg}`),
    [cvv.name]: yup
      .string()
      .matches(visaRegEx, 'CVV has to be between 3 to 4 digits')
      .required(`${cvv.requiredErrorMsg}`),
  }),
];
