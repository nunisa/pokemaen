import React from 'react';
import { shallow } from 'enzyme';
import Cards from './Cards.jsx';

let wrapper;

describe('Cards component', () => {
    beforeEach(() => {
        wrapper = shallow(<Cards filtered={[]} pokemaenApiUtils={{}} />);
    });

    it('should be defined', () => {
        expect(typeof Cards).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
