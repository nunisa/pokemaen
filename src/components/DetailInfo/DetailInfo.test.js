import React from 'react';
import { shallow } from 'enzyme';
import DetailInfo from './DetailInfo.jsx';

let wrapper;

describe('DetailInfo component', () => {
    beforeEach(() => {
        wrapper = shallow(<DetailInfo />);
    });

    it('should be defined', () => {
        expect(typeof DetailInfo).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
