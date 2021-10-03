import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
        padding: theme.spacing(4)
    },
    middleContent: {
        padding: theme.spacing(4)
    },
    bottomContent: {
        padding: theme.spacing(4)
    }
}));

const App = props => {
    const muiClasses = muiStyles();

    return (
        <div className={muiClasses.mainContainer}>
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
        </div>
    );
};

export default App;
