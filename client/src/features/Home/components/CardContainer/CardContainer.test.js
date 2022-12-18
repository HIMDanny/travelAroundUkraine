/* eslint-disable react/prop-types */
import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import CardContainer from './CardContainer';

const RouterWrapper = ({children}) => <MemoryRouter>{children}</MemoryRouter>;

jest.mock('@mui/material/Typography', () => ({children}) => <h2>{children}</h2>);
jest.mock('@mui/material/Container', () => ({children}) => <div>{children}</div>);

describe('Card Container Snapshot test', () => {
    test('should CardContainer match snapshot', () => {
        const {asFragment} = render(<CardContainer/>, {wrapper: RouterWrapper});
        expect(asFragment()).toMatchSnapshot();
    });
});
