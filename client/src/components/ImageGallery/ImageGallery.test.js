import { render } from '@testing-library/react';
import { ImageGallery } from '../index';

describe('Swiper has to render', () => {
  test('swiper renders', () => {
    const { asFragment } = render(<ImageGallery />);
    expect(asFragment()).toMatchSnapshot();
  });
});
