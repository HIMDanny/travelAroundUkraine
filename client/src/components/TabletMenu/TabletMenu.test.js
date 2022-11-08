import { render } from '@testing-library/react';
import TabletMenu from './TabletMenu';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);

describe('Render TabletMenu', () => {
  test('should TabletMenu render', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <TabletMenu />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
