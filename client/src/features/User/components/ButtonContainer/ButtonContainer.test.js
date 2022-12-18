import { render } from '@testing-library/react';
import ButtonContainer from './ButtonContainer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../../store';

jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);

describe('Render ButtonContainer', () => {
  test('should ButtonContainer render', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ButtonContainer />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
