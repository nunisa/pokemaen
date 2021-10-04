import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

let wrapper;

describe('NotFound component', () => {
    beforeEach(() => {
        wrapper = shallow(<NotFound />);
    });

    it('should be defined', () => {
        expect(typeof NotFound).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
