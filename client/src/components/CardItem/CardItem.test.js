import { render } from '@testing-library/react';
import CardItem from './CardItem'

describe('Card Item Snapshot test', () => {
    test('should CardContainer match snapshot', () => {
        const { asFragment } = render(<CardItem />);
        expect(asFragment()).toMatchSnapshot();
    });
});