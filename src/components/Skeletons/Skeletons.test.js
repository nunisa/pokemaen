import React from 'react';
import { shallow } from 'enzyme';
import { DetailsSkeleton } from './Skeletons';

let wrapper;

describe('DetailsSkeleton component', () => {
    beforeEach(() => {
        wrapper = shallow(<DetailsSkeleton />);
    });

    it('should be defined', () => {
        expect(typeof DetailsSkeleton).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
