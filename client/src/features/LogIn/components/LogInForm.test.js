import LogInForm from './LogInForm';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../store';
import { render } from '@testing-library/react';

jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('../../../api/postLogIn', () => () => () => {});

describe('Render LogInForm', () => {
  test('should LogInForm render', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LogInForm />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
