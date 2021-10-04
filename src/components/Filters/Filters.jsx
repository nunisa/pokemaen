import { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// MUI custom styles
const muiStyles = makeStyles(theme => ({
    displayType: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    filtersContainer: {
        flexDirection: 'row',
        marginRight: theme.spacing(4)
    },
    searchBox: {
        marginRight: theme.spacing(4)
    }
}));

const Filters = props => {
    const muiClasses = muiStyles();
    const { pokemons, onSearchChange, onSortByChange } = props;
    const [searchNameStr, setSearchNameStr] = useState('');
    const [searchAbleStr, setSearchAbleStr] = useState('');
    const [sortByValue, setSortByValue] = useState('');
    const [sortByInputValue, setSortByInputValue] = useState('');

    const handleSearchChange = name => e => {
        const newStr = e.target.value;
        if (pokemons) {
            const newPokemons = _.cloneDeep(pokemons);
            if (newStr) {
                if (name === 'name') {
                    setSearchNameStr(newStr);
                    onSearchChange(
                        newPokemons.results.filter(item =>
                            item.name.includes(newStr.toLowerCase())
                        )
                    );
                } else {
                    const promises = newPokemons.results.reduce((arr, item) => {
                        arr.push(fetch(item.url).then(res => res.json()));

                        return arr;
                    }, []);
                    Promise.all(promises).then(res => {
                        const results = res.reduce((arr, item) => {
                            item.abilities.forEach(able => {
                                if (
                                    !able.is_hidden &&
                                    able.ability.name.includes(
                                        newStr.toLowerCase()
                                    )
                                ) {
                                    arr.push(item);
                                }
                            });

                            return arr;
                        }, []);
                        setSearchAbleStr(newStr);
                        onSearchChange(results);
                    });
                }
            } else {
                setSearchNameStr('');
                setSearchAbleStr('');
                onSearchChange(newPokemons.results);
            }
        }
    };
    const handleSortByChange = (e, newValue) => {
        setSortByValue(newValue);
        const needle = (newValue && newValue.toLowerCase()) || '';
        if (pokemons) {
            const newPokemons = _.cloneDeep(pokemons);
            if (newValue) {
                if (newValue === 'Name') {
                    onSortByChange(
                        newPokemons.results.sort((a, b) =>
                            a.name > b.name ? 1 : -1
                        )
                    );
                } else if (newValue === 'Height' || newValue === 'Weight') {
                    const promises = newPokemons.results.reduce((arr, item) => {
                        arr.push(fetch(item.url).then(res => res.json()));

                        return arr;
                    }, []);
                    Promise.all(promises).then(res => {
                        onSortByChange(
                            res.sort((a, b) => (a[needle] > b[needle] ? -1 : 1))
                        );
                    });
                }
            } else {
                onSortByChange(newPokemons.results);
            }
        }
    };
    const handleSortByInputChange = (e, newInputValue) => {
        setSortByInputValue(newInputValue);
    };

    return (
        <Box
            className={`${muiClasses.displayType} ${muiClasses.filtersContainer}`}
        >
            <TextField
                fullWidth
                variant="outlined"
                id="search-by-name"
                label="Search By Name"
                className={muiClasses.searchBox}
                value={searchNameStr}
                onChange={handleSearchChange('name')}
            />
            <TextField
                fullWidth
                variant="outlined"
                id="search-by-abilities"
                label="Search By Abilities"
                className={muiClasses.searchBox}
                value={searchAbleStr}
                onChange={handleSearchChange('abilities')}
            />
            <Autocomplete
                fullWidth
                id="sort-by-select"
                options={['Name', 'Height', 'Weight']}
                defaultValue={null}
                value={sortByValue}
                inputValue={sortByInputValue}
                renderInput={params => (
                    <TextField {...params} label="Sort By" variant="outlined" />
                )}
                getOptionSelected={(option, value) =>
                    option === value || value === ''
                }
                onChange={handleSortByChange}
                onInputChange={handleSortByInputChange}
            />
        </Box>
    );
};

Filters.propTypes = {
    pokemons: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSearchChange: PropTypes.func.isRequired,
    onSortByChange: PropTypes.func.isRequired
};

export default Filters;
