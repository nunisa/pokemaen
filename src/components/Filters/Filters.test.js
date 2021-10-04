import React from 'react';
import { shallow } from 'enzyme';
import Filters from './Filters.jsx';

let wrapper;

describe('Filters component', () => {
    beforeEach(() => {
        wrapper = shallow(
            <Filters
                pokemons={[]}
                onSearchChange={() => {}}
                onSortByChange={() => {}}
            />
        );
    });

    it('should be defined', () => {
        expect(typeof Filters).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
