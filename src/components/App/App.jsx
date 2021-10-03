import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DetailsCard from '../DetailsCard';
import { pokemons } from '../../assets/sample/data';

// MUI custom styles
const muiStyles = makeStyles(theme => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        fontSize: theme.typography.h5.fontSize
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

const App = props => {
    const muiClasses = muiStyles();

    return (
        <div className={muiClasses.mainContainer}>
            <div
                className={`${muiClasses.displayType} ${muiClasses.topContent}`}
            >
                <Box>Previous</Box>
                <Box>Filters</Box>
                <Box>Next</Box>
            </div>
            <div
                className={`${muiClasses.displayType} ${muiClasses.middleContent}`}
            >
                <Grid container spacing={2}>
                    {pokemons.map(pokemon => (
                        <Grid item xs={6} md={2} key={pokemon.name}>
                            <DetailsCard pokemon={pokemon} />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <div
                className={`${muiClasses.displayType} ${muiClasses.bottomContent}`}
            >
                <Box>Previous</Box>
                <Box>Next</Box>
            </div>
        </div>
    );
};

export default App;
