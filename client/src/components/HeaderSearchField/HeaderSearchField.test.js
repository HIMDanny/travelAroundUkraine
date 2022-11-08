import { render } from '@testing-library/react';
import HeaderSearchField from './HeaderSearchField';

jest.mock('@mui/material/InputBase', () => ({ children }) => <input>{children}</input>);

describe('Render HeaderSearchField', () => {
  test('should HeaderSearchField render', () => {
    const { asFragment } = render(<HeaderSearchField />);
    expect(asFragment()).toMatchSnapshot();
  });
});
