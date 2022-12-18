import { render } from '@testing-library/react';
import LogoHeader from './LogoHeader';
import { BrowserRouter } from 'react-router-dom';

describe('Render LogoHeader', () => {
  test('should LogoHeader render', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <LogoHeader />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
