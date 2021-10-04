import React from 'react';
import { shallow } from 'enzyme';
import Pagination from './Pagination.jsx';

let wrapper;

describe('Pagination component', () => {
    beforeEach(() => {
        wrapper = shallow(
            <Pagination
                limit={10}
                offset={10}
                filtered={[]}
                onSizeChange={() => {}}
                onBtnClick={() => {}}
            />
        );
    });

    it('should be defined', () => {
        expect(typeof Pagination).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
