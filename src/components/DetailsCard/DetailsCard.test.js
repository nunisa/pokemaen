import React from 'react';
import { shallow } from 'enzyme';
import DetailsCard from './DetailsCard.jsx';

let wrapper;

describe('DetailsCard component', () => {
    beforeEach(() => {
        wrapper = shallow(<DetailsCard pokemon={{}} pokemaenApiUtils={{}} />);
    });

    it('should be defined', () => {
        expect(typeof DetailsCard).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
