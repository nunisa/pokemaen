import { useEffect, useState } from 'react';
import _ from 'lodash/fp';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Pagination from '../Pagination';
import DetailsCard from '../DetailsCard';
import { DetailsSkeleton } from '../Skeletons';
import PokemaenApiUtils from '../../assets/utils/apiEndpointMethods';

// Init API util class
const pokemaenApiUtils = new PokemaenApiUtils();
// MUI custom styles
const muiStyles = makeStyles(theme => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0
    },
    displayType: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: theme.spacing(4)
    },
    middleContent: {
        padding: theme.spacing(4)
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: theme.spacing(4)
    },
    mlAuto: {
        marginLeft: 'auto'
    },
    filtersContainer: {
        flexGrow: 1,
        marginRight: theme.spacing(4)
    }
}));

const App = props => {
    const muiClasses = muiStyles();
    const [pokemons, setPokemons] = useState(null);
    const [filtered, setFiltered] = useState(null);
    const [sortByValue, setSortByValue] = useState('');
    const [sortByInputValue, setSortByInputValue] = useState('');
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const getAllPokemons = async () => {
            try {
                const res = await pokemaenApiUtils.getAllPokemons({
                    limit,
                    offset
                });
                setPokemons(res.data);
                setFiltered(res.data);
            } catch (err) {
                // Error occurred
            }
        };
        getAllPokemons();
    }, [limit, offset]);

    const handleSortByChange = (e, newValue) => {
        setSortByValue(newValue);
        const needle = (newValue && newValue.toLowerCase()) || '';
        if (pokemons) {
            const newPokemons = _.cloneDeep(pokemons);
            if (newValue) {
                if (newValue === 'Name') {
                    setFiltered({
                        ...newPokemons,
                        results: newPokemons.results.sort((a, b) =>
                            a.name > b.name ? 1 : -1
                        )
                    });
                } else if (newValue === 'Height' || newValue === 'Weight') {
                    const promises = newPokemons.results.reduce((arr, item) => {
                        arr.push(fetch(item.url).then(res => res.json()));

                        return arr;
                    }, []);
                    Promise.all(promises).then(res => {
                        setFiltered({
                            ...newPokemons,
                            results: res.sort((a, b) =>
                                a[needle] > b[needle] ? -1 : 1
                            )
                        });
                    });
                }
            } else {
                setFiltered({
                    ...newPokemons,
                    results: newPokemons.results
                });
            }
        }
    };
    const handleSortByInputChange = (e, newInputValue) => {
        setSortByInputValue(newInputValue);
    };
    const handlePageSizeChange = newLimit => {
        setLimit(newLimit);
    };
    const handlePrevNext = name => {
        let newOffset = offset;
        if (name === 'next') {
            newOffset += limit;
            newOffset =
                newOffset >= pokemons.count ? pokemons.count : newOffset;
        } else {
            newOffset -= limit;
            newOffset = newOffset < limit ? 0 : newOffset;
        }
        setOffset(newOffset);
    };

    return (
        <div className={muiClasses.mainContainer}>
            <div
                className={`${muiClasses.displayType} ${muiClasses.topContent}`}
            >
                <Box className={muiClasses.filtersContainer}>
                    <Autocomplete
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
                </Box>
                <Pagination
                    limit={limit}
                    disablePrevBtn={!filtered || (filtered && offset <= 0)}
                    disableNextBtn={
                        !filtered || (filtered && offset >= filtered.count)
                    }
                    onSizeChange={handlePageSizeChange}
                    onBtnClick={handlePrevNext}
                />
            </div>
            <div
                className={`${muiClasses.displayType} ${muiClasses.middleContent}`}
            >
                <Grid container spacing={2}>
                    {filtered && filtered.results && filtered.results.length
                        ? filtered.results.map(pokemon => (
                              <Grid item xs={6} md={2} key={pokemon.name}>
                                  <DetailsCard
                                      pokemon={pokemon}
                                      pokemaenApiUtils={pokemaenApiUtils}
                                  />
                              </Grid>
                          ))
                        : [...new Array(12)].fill(0).map(() => (
                              <Grid
                                  item
                                  xs={6}
                                  md={2}
                                  key={Math.random().toString().slice(0, 6)}
                              >
                                  <DetailsSkeleton />
                              </Grid>
                          ))}
                </Grid>
            </div>
            <div
                className={`${muiClasses.displayType} ${muiClasses.bottomContent}`}
            >
                <Pagination
                    limit={limit}
                    disablePrevBtn={!filtered || (filtered && offset <= 0)}
                    disableNextBtn={
                        !filtered || (filtered && offset >= filtered.count)
                    }
                    onSizeChange={handlePageSizeChange}
                    onBtnClick={handlePrevNext}
                />
            </div>
        </div>
    );
};

export default App;
