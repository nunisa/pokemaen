import { useEffect, useState } from 'react';
import _ from 'lodash/fp';
import { makeStyles } from '@material-ui/core/styles';
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
        padding: theme.spacing(4)
    },
    middleContent: {
        padding: theme.spacing(4)
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: theme.spacing(4)
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
                <Filters
                    pokemons={pokemons}
                    onSearchChange={handleSearchChange}
                    onSortByChange={handleSortByChange}
                />
                <Pagination
                    limit={limit}
                    offset={offset}
                    filtered={filtered}
                    onSizeChange={handlePageSizeChange}
                    onBtnClick={handlePrevNext}
                />
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
