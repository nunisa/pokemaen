import React from 'react';
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import App from './App';

let wrapper;

describe('App component', () => {
    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it('should be defined', () => {
        expect(typeof App).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });

    test('renders more pokemons link', () => {
        render(<App />);
        const linkElement = screen.getByText(/more pokemons/i);
        expect(linkElement).toBeInTheDocument();
    });
});
