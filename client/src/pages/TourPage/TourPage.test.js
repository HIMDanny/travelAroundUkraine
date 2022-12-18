import { render } from '@testing-library/react';
import TourPage from './TourPage';

import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

jest.mock('@mui/material/Box', () => 'div');
jest.mock('@mui/material/Stack', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Container', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Typography', () => ({ children }) => <p>{children}</p>);
jest.mock('@mui/material/Button', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Slide', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Link', () => ({ children }) => <a>{children}</a>);
jest.mock('../../features/Tour/components/TourAccordion/TourAccordion', () => ({ children }) => <div>{children}</div>);
jest.mock('../../features/Tour/components/TourInfoDialog/TourInfoDialog', () => () => <div>TourInfoDialog</div>);
jest.mock('../../features/Tour/components/TourReasonToChoose/TourReasonToChoose', () => () => (
  <div>TourReasonToChoose</div>
));

let mockedMatchesMediaQuery = true;
jest.mock('@mui/material/useMediaQuery', () => jest.fn(() => mockedMatchesMediaQuery));

describe('Tour Page snapshot testing', () => {
  test('should Tour Page match snapshot', () => {
    const { asFragment } = render(<TourPage />);
    mockAllIsIntersecting(true);

    expect(asFragment()).toMatchSnapshot();
  });
});
