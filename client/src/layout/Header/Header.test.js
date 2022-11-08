import { render } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@mui/material/AppBar', () => ({ children }) => <header>{children}</header>);
jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Toolbar', () => ({ children }) => <div>{children}</div>);
jest.mock('../../components/BurgerMenu/BurgerMenu.js', () => () => <div>BurgerMenu</div>);
jest.mock('../../components/TabletMenu/TabletMenu.js', () => () => <div>TabletMenu</div>);
jest.mock('../../components/LogoHeader/LogoHeader.js', () => () => <div>LogoHeader</div>);
jest.mock('../../components/HeaderSearchField/HeaderSearchField.js', () => () => <div>HeaderSearchField</div>);

describe('Render Header', () => {
  test('should Header render', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
