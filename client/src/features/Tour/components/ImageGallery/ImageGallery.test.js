import { render } from '@testing-library/react';
import { ImageGallery } from '../index';

jest.mock('../../../../components/SliderButton/SliderButton', () => () => <button>test button</button>);

describe('Swiper has to render', () => {
  test('swiper renders', () => {
    const { asFragment } = render(<ImageGallery />);
    expect(asFragment()).toMatchSnapshot();
  });
});
