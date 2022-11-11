import { render } from '@testing-library/react';
import BurgerMenu from './BurgerMenu';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/MenuItem', () => ({ children }) => <li>{children}</li>);
jest.mock('@mui/material/Menu', () => ({ children }) => <ul>{children}</ul>);
jest.mock('@mui/material/IconButton', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Typography', () => ({ children }) => <a>{children}</a>);

describe('Render BurgerMenu', () => {
  test('should BurgerMenu render', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <BurgerMenu />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
