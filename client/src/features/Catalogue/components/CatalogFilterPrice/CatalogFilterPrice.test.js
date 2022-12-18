import { render } from '@testing-library/react';
import CatalogFilterPrice from './CatalogFilterPrice';

jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Slider', () => ({ children }) => <span>{children}</span>);
jest.mock('@mui/material/InputBase', () => ({ children }) => <input>{children}</input>);


describe('CatalogFilterPrice snapshot test', () => {
  test('should CatalogFilterPrice match snapshot', () => {
    const { asFragment } = render(<CatalogFilterPrice />);
    expect(asFragment()).toMatchSnapshot();
  });
});
