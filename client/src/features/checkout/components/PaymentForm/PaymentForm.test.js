/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import PaymentForm from './PaymentForm';
import checkoutFormModel from '../../utils/checkoutFormModels/checkoutFormModel';

jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/MenuItem', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Grid', () => ({ children }) => <div>{children}</div>);

const FormikWrapper = ({ children }) => <Formik>{children}</Formik>;

describe('PaymentForm snapshot test', () => {
  test('should PaymentForm match snapshot', () => {
    const { asFragment } = render(
      <FormikWrapper>
        <PaymentForm checkoutFormModel={checkoutFormModel} />
      </FormikWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});