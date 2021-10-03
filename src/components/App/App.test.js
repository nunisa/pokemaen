import React from 'react';
import { shallow } from 'enzyme';
import App from './App.jsx';

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
});
