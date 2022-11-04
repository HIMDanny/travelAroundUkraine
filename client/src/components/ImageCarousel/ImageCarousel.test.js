/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import ImageCarousel from './ImageCarousel';

describe('Image Carousel Snapshot test', () => {
  test('should ImageCarousel match snapshot', () => {
    const { asFragment } = render(<ImageCarousel />);
    expect(asFragment()).toMatchSnapshot();
  });
});