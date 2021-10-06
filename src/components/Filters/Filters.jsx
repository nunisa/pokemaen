import { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// MUI custom styles
const muiStyles = makeStyles(theme => ({
    displayType: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    searchBox: {
        marginRight: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            marginRight: 0
        }
    }
}));

const Filters = props => {
    const muiClasses = muiStyles();
    const { pokemons, filtered, onSearchChange, onSortByChange } = props;
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
                    getAndSetPokeDetailsByName(newPokemons, newStr);
                } else {
                    getAndSetPokeDetailsByAbilities(newPokemons, newStr);
                }
            } else {
                if (name === 'name' && !searchNameStr && searchAbleStr) {
                    getAndSetPokeDetailsByAbilities(
                        newPokemons,
                        searchAbleStr,
                        true
                    );
                } else if (
                    name === 'abilities' &&
                    searchNameStr &&
                    !searchAbleStr
                ) {
                    getAndSetPokeDetailsByName(
                        newPokemons,
                        searchNameStr,
                        true
                    );
                } else {
                    setSearchNameStr('');
                    setSearchAbleStr('');
                    onSearchChange(pokemons.results);
                }
            }
        }
    };
    const getAndSetPokeDetailsByName = (
        newPokemons,
        newStr,
        noAbleStr = false
    ) => {
        if (noAbleStr) {
            setSearchAbleStr('');
        }
        setSearchNameStr(newStr);
        onSearchChange(
            newPokemons.results.filter(item =>
                item.name.includes(newStr.toLowerCase())
            )
        );
    };
    const getAndSetPokeDetailsByAbilities = (
        newPokemons,
        newStr,
        noNameStr = false
    ) => {
        const promises = newPokemons.results.reduce((arr, item) => {
            arr.push(fetch(item.url).then(res => res.json()));

            return arr;
        }, []);
        Promise.all(promises).then(res => {
            const results = res.reduce((arr, item) => {
                item.abilities.forEach(able => {
                    if (
                        !able.is_hidden &&
                        able.ability.name.includes(newStr.toLowerCase())
                    ) {
                        arr.push({
                            ...item.species,
                            url: item.species.url.replace('-species', '')
                        });
                    }
                });

                return arr;
            }, []);
            if (noNameStr) {
                setSearchNameStr('');
            }
            setSearchAbleStr(newStr);
            onSearchChange(results);
        });
    };
    const handleSortByChange = (e, newValue) => {
        setSortByValue(newValue || '');
        if (pokemons && filtered) {
            const newPokemons = _.cloneDeep(filtered);
            sortPokemons(newPokemons, newValue);
        }
    };
    const sortPokemons = (newPokemons, newValue) => {
        const needle = (newValue && newValue.toLowerCase()) || '';
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
                    const sorted = res.sort((a, b) =>
                        a[needle] > b[needle] ? -1 : 1
                    );
                    onSortByChange(
                        sorted.map(item => ({
                            ...item.species,
                            url: item.species.url.replace('-species', '')
                        }))
                    );
                });
            }
        } else {
            if (filtered.results.length) {
                onSortByChange(filtered.results);
            } else {
                onSortByChange(newPokemons.results);
            }
        }
    };
    const handleSortByInputChange = (e, newInputValue) => {
        setSortByInputValue(newInputValue);
    };

    return (
        <>
            <Grid container item xs={12} md={4}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    id="search-by-name"
                    label="Search By Name"
                    className={muiClasses.searchBox}
                    value={searchNameStr}
                    onChange={handleSearchChange('name')}
                />
            </Grid>
            <Grid container item xs={12} md={4}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    id="search-by-abilities"
                    label="Search By Abilities"
                    className={muiClasses.searchBox}
                    value={searchAbleStr}
                    onChange={handleSearchChange('abilities')}
                />
            </Grid>
            <Grid container item xs={12} md={4}>
                <Autocomplete
                    fullWidth
                    size="small"
                    id="sort-by-select"
                    options={['Name', 'Height', 'Weight']}
                    defaultValue={null}
                    value={sortByValue}
                    inputValue={sortByInputValue}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Sort By"
                            variant="outlined"
                        />
                    )}
                    getOptionSelected={(option, value) =>
                        option === value || value === ''
                    }
                    onChange={handleSortByChange}
                    onInputChange={handleSortByInputChange}
                />
            </Grid>
        </>
    );
};

Filters.propTypes = {
    pokemons: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSearchChange: PropTypes.func.isRequired,
    onSortByChange: PropTypes.func.isRequired
};

export default Filters;
