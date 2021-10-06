import { useEffect, useState } from 'react';
import _ from 'lodash/fp';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Filters from '../Filters';
import Pagination from '../Pagination';
import Cards from '../Cards';
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
        padding: theme.spacing(4, 4, 1),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2)
        }
    },
    mainGridContainer: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    filtersContainer: {
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            '& .MuiGrid-root': {
                '&:not(:last-child)': {
                    marginBottom: theme.spacing(2.5)
                }
            }
        },
        [theme.breakpoints.down('xs')]: {
            '& .MuiGrid-root': {
                '&:not(:last-child)': {
                    marginBottom: theme.spacing(1.75)
                }
            }
        }
    },
    paginationGridItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    middleContent: {
        padding: theme.spacing(1, 4),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2)
        }
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 4, 4),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2)
        }
    }
}));

const Home = props => {
    const muiClasses = muiStyles();
    const [pokemons, setPokemons] = useState(null);
    const [filtered, setFiltered] = useState(null);
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

    const handleSearchChange = newResults => {
        if (pokemons) {
            const newPokemons = _.cloneDeep(pokemons);
            setFiltered({
                ...newPokemons,
                results: newResults
            });
        }
    };
    const handleSortByChange = newResults => {
        if (pokemons) {
            const newPokemons = _.cloneDeep(pokemons);
            setFiltered({
                ...newPokemons,
                results: newResults
            });
        }
    };
    const handlePageSizeChange = newLimit => {
        setLimit(newLimit);
    };
    const handlePrevNext = newOffset => {
        setOffset(newOffset);
    };

    return (
        <div className={muiClasses.mainContainer}>
            <div
                className={`${muiClasses.displayType} ${muiClasses.topContent}`}
            >
                <Grid
                    container
                    spacing={2}
                    className={muiClasses.mainGridContainer}
                >
                    <Grid
                        container
                        item
                        xs={12}
                        md={8}
                        className={`${muiClasses.displayType} ${muiClasses.filtersContainer}`}
                    >
                        <Filters
                            pokemons={pokemons}
                            filtered={filtered}
                            onSearchChange={handleSearchChange}
                            onSortByChange={handleSortByChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        className={muiClasses.paginationGridItem}
                    >
                        <Pagination
                            limit={limit}
                            offset={offset}
                            filtered={filtered}
                            onSizeChange={handlePageSizeChange}
                            onBtnClick={handlePrevNext}
                        />
                    </Grid>
                </Grid>
            </div>
            <div
                className={`${muiClasses.displayType} ${muiClasses.middleContent}`}
            >
                <Cards
                    filtered={filtered}
                    pokemaenApiUtils={pokemaenApiUtils}
                />
            </div>
            <div
                className={`${muiClasses.displayType} ${muiClasses.bottomContent}`}
            >
                <Pagination
                    limit={limit}
                    offset={offset}
                    filtered={filtered}
                    onSizeChange={handlePageSizeChange}
                    onBtnClick={handlePrevNext}
                />
            </div>
        </div>
    );
};

export default Home;
