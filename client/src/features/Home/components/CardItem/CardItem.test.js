import React from 'react';
import { render } from '@testing-library/react';
import CardItem from './CardItem';

jest.mock('@mui/material/Typography', () => ({ children }) => <h2>{children}</h2>);
jest.mock('@mui/material/Box', () => ({ children }) => <img alt="test img" />);

describe('Card Item Snapshot test', () => {
  test('should CardItem match snapshot', () => {
    const { asFragment } = render(<CardItem />);
    expect(asFragment()).toMatchSnapshot();
  });
});
