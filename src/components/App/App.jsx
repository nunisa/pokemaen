import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
    }
}));

const App = props => {
    const muiClasses = muiStyles();
    const [pokemons, setPokemons] = useState(null);
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
            } catch (err) {
                // Error occurred
            }
        };
        getAllPokemons();
    }, [limit, offset]);

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
                <Box>Filters</Box>
                <Pagination
                    limit={limit}
                    disablePrevBtn={!pokemons || (pokemons && offset <= 0)}
                    disableNextBtn={
                        !pokemons || (pokemons && offset >= pokemons.count)
                    }
                    onSizeChange={handlePageSizeChange}
                    onBtnClick={handlePrevNext}
                />
            </div>
            <div
                className={`${muiClasses.displayType} ${muiClasses.middleContent}`}
            >
                <Grid container spacing={2}>
                    {pokemons && pokemons.results && pokemons.results.length
                        ? pokemons.results.map(pokemon => (
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
                    disablePrevBtn={!pokemons || (pokemons && offset <= 0)}
                    disableNextBtn={
                        !pokemons || (pokemons && offset >= pokemons.count)
                    }
                    onSizeChange={handlePageSizeChange}
                    onBtnClick={handlePrevNext}
                />
            </div>
        </div>
    );
};

export default App;
