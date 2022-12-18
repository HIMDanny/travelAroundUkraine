import { render } from '@testing-library/react';
import OutlinedToggleButton from './OutlinedToggleButton';

jest.mock('@mui/material/ToggleButton', () => ({ children }) => <button>{children}</button>);

describe('OutlinedToggleButton snapshot test', () => {
  test('should OutlinedToggleButton match snapshot', () => {
    const { asFragment } = render(<OutlinedToggleButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
