import { render } from '@testing-library/react';
import CatalogFilterSeason from './CatalogFilterSeason';

jest.mock('@mui/material/Box', () => ({ children }) => <div>{children}</div>);
jest.mock('@mui/material/Checkbox', () => ({ children }) => <span>{children}</span>);
jest.mock('@mui/material/FormControlLabel', () => ({ children }) => <label>{children}</label>);

jest.mock('../FilterAccordion/FilterAccordion', () => ({ children }) => <div>{children}</div>);

describe('CatalogFilterSeason snapshot test', () => {
  test('should CatalogFilterSeason match snapshot', () => {
    const { asFragment } = render(<CatalogFilterSeason />);
    expect(asFragment()).toMatchSnapshot();
  });
});