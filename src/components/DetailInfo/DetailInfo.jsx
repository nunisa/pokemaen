import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';
import { DetailsSkeleton } from '../Skeletons';
import PokemaenApiUtils from '../../assets/utils/apiEndpointMethods';

// Init API util class
const pokemaenApiUtils = new PokemaenApiUtils();
// MUI custom styles
const muiStyles = makeStyles(theme => ({
    displayType: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    card: {
        width: '60%',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    cardActionArea: {
        justifyContent: 'space-evenly',
        height: `calc(100vh - ${theme.spacing(8)}px)`,
        padding: theme.spacing(2, 0)
    },
    cardMediaContainer: {
        height: theme.spacing(30),
        width: theme.spacing(30),
        border: '4px solid #00ff00',
        borderRadius: '50%',
        margin: '0 auto',
        padding: theme.spacing(2),
        overflow: 'hidden',
        '& > img': {
            height: '100%',
            width: '100%'
        }
    },
    pokemonName: {
        textTransform: 'capitalize',
        fontSize: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
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

const DetailInfo = props => {
    const muiClasses = muiStyles();
    const pokemonName =
        (props.match && props.match.params && props.match.params.pname) || '';
    const [details, setDetails] = useState({});

    useEffect(() => {
        const getPokemonByName = async () => {
            try {
                const res = await pokemaenApiUtils.getPokemonByName({
                    pokemonName
                });
                setDetails(res.data);
            } catch (err) {
                // Error occurred
            }
        };
        getPokemonByName();

        return () => {
            setDetails({});
        };
    }, [pokemonName]);

    const { name, height, weight, abilities, sprites } = details;

    return Object.keys(details).length ? (
        <Card className={muiClasses.card}>
            <CardActionArea
                className={`${muiClasses.displayType} ${muiClasses.cardActionArea}`}
            >
                <Box className={muiClasses.cardMediaContainer}>
                    <CardMedia
                        component="img"
                        image={sprites.other['official-artwork'].front_default}
                        alt={name}
                    />
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
                            {`${height / 10}m`}
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
                            {`${weight / 10}kg`}
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
                            {abilities
                                .filter(item => !item.is_hidden)
                                .reduce((arr, { ability: { name } }) => {
                                    let capChartAt0 = '';
                                    if (name.includes('-')) {
                                        capChartAt0 = name
                                            .split('-')
                                            .map(
                                                ab =>
                                                    `${ab
                                                        .slice(0, 1)
                                                        .toUpperCase()}${ab
                                                        .slice(1)
                                                        .toLowerCase()}`
                                            )
                                            .join(' ');
                                    } else {
                                        capChartAt0 = `${name
                                            .slice(0, 1)
                                            .toUpperCase()}${name
                                            .slice(1)
                                            .toLowerCase()}`;
                                    }
                                    arr.push(capChartAt0);

                                    return arr;
                                }, [])
                                .map(able => (
                                    <Chip
                                        key={`${able}-${Math.random()
                                            .toString()
                                            .slice(0, 6)}`}
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
    ) : (
        <DetailsSkeleton />
    );
};

export default DetailInfo;
