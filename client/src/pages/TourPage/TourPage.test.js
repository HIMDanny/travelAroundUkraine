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
jest.mock('../../components/TourAccordion/TourAccordion.js', () => ({ children }) => <div>{children}</div>);
jest.mock('../../components/TourInfoDialog/TourInfoDialog.js', () => () => <div>TourInfoDialog</div>);
jest.mock('../../components/TourReasonToChoose/TourReasonToChoose.js', () => () => <div>TourReasonToChoose</div>);

describe('Tour Page snapshot testing', () => {
  test('should Tour Page match snapshot', () => {
    const { asFragment } = render(<TourPage />);
    mockAllIsIntersecting(true);

    expect(asFragment()).toMatchSnapshot();
  });
});
