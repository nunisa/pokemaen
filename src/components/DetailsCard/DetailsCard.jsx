import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';

// MUI custom styles
const muiStyles = makeStyles(theme => ({
    displayType: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    cardMediaContainer: {
        height: theme.spacing(15),
        width: theme.spacing(15),
        margin: '0 auto',
        padding: theme.spacing(2),
        overflow: 'hidden',
        '& > img': {
            height: '100%',
            width: '100%'
        }
    },
    pokemonName: {},
    sizeSpec: {
        flexDirection: 'row'
    },
    chipContainer: {
        marginTop: theme.spacing(0.5),
        '& .MuiChip-root': {
            '&:not(:last-child)': {
                marginRight: theme.spacing(1)
            }
        }
    },
    ml: {
        marginLeft: theme.spacing(0.5)
    },
    dot: {
        height: theme.spacing(0.5),
        width: theme.spacing(0.5),
        backgroundColor: theme.palette.text.secondary,
        borderRadius: '50%',
        margin: theme.spacing(0, 0.5, 0.75, 0.75)
    }
}));

const DetailsCard = props => {
    const muiClasses = muiStyles();
    const {
        pokemon: { name, height, weight, abilities, dp }
    } = props;

    return (
        <Card>
            <CardActionArea>
                <Box className={muiClasses.cardMediaContainer}>
                    <CardMedia component="img" image={dp} alt={name} />
                </Box>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className={`${muiClasses.displayType} ${muiClasses.pokemonName}`}
                    >
                        {name}
                    </Typography>
                    <Box
                        className={`${muiClasses.displayType} ${muiClasses.sizeSpec}`}
                    >
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                        >
                            Height:
                        </Typography>
                        <Typography
                            variant="body2"
                            gutterBottom
                            className={muiClasses.ml}
                        >
                            {`${height / 100}m`}
                        </Typography>
                        <Box component="span" className={muiClasses.dot} />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                            className={muiClasses.ml}
                        >
                            Weight:
                        </Typography>
                        <Typography
                            variant="body2"
                            gutterBottom
                            className={muiClasses.ml}
                        >
                            {`${weight / 1000}kg`}
                        </Typography>
                    </Box>
                    <Box className={muiClasses.displayType}>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            component="div"
                        >
                            Abilities
                        </Typography>
                        <Box className={muiClasses.chipContainer}>
                            {abilities.map(able => (
                                <Chip
                                    key={able}
                                    label={able}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                            ))}
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default DetailsCard;
