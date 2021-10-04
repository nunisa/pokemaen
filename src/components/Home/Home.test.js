import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home.jsx';

let wrapper;

describe('Home component', () => {
    beforeEach(() => {
        wrapper = shallow(<Home />);
    });

    it('should be defined', () => {
        expect(typeof Home).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
