import { render } from '@testing-library/react';
import CatalogFilterTourists from './CatalogFilterTourists';

jest.mock('@mui/material/ToggleButton', () => ({ children }) => <button>{children}</button>);
jest.mock('@mui/material/Unstable_Grid2', () => ({ children }) => <div>{children}</div>);

jest.mock('../FilterAccordion/FilterAccordion', () => ({ children }) => <div>{children}</div>);
jest.mock('../OutlinedToggleButton/OutlinedToggleButton', () => () => <button>test button</button>);

describe('CatalogFilterTourists snapshot test', () => {
  test('should CatalogFilterTourists match snapshot', () => {
    const { asFragment } = render(<CatalogFilterTourists />);
    expect(asFragment()).toMatchSnapshot();
  });
});
