import React from 'react';
import { shallow } from 'enzyme';
import DetailsCard from './DetailsCard';

let wrapper;

describe('DetailsCard component', () => {
    beforeEach(() => {
        wrapper = shallow(<DetailsCard />);
    });

    it('should be defined', () => {
        expect(typeof DetailsCard).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});