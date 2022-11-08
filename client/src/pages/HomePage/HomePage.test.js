/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import HomePage from './HomePage';

jest.mock('@mui/material/Box', () => ({ children }) => <section>{children}</section>);
jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <h1>{children}</h1>);
jest.mock('@mui/material/Button', () => () => <button>MUI COMPONENT</button>);
jest.mock('../../components/ImageCarousel/ImageCarousel', () => () => <div>IMAGE CAROUSEL</div>);

describe('Home page Snapshot test', () => {
  test('should HomePage match snapshot', () => {
    const { asFragment } = render(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
