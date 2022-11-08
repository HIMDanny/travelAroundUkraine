import { render } from '@testing-library/react';
import CardContainer from './CardContainer'

describe('Card Container Snapshot test', () => {
    test('should CardContainer match snapshot', () => {
        const { asFragment } = render(<CardContainer />);
        expect(asFragment()).toMatchSnapshot();
    });
});