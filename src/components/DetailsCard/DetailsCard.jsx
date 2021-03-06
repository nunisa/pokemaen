import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';
import { DetailsSkeleton } from '../Skeletons';

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
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.5s'
        }
    },
    cardActionArea: {
        padding: theme.spacing(2, 0)
    },
    cardMediaContainer: {
        height: theme.spacing(22.5),
        width: theme.spacing(22.5),
        margin: '0 auto',
        overflow: 'hidden',
        '& > img': {
            height: '100%',
            width: '100%'
        },
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing(22.5),
            width: theme.spacing(22.5)
        }
    },
    pokemonName: {
        textTransform: 'capitalize',
        fontSize: theme.spacing(2.5)
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

const DetailsCard = props => {
    const muiClasses = muiStyles();
    const { pokemon, pokemaenApiUtils } = props;
    const [details, setDetails] = useState({});

    useEffect(() => {
        const getPokemonByName = async () => {
            try {
                const res = await pokemaenApiUtils.getPokemonByName({
                    pokemonName: pokemon.name
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
    }, [pokemon, pokemaenApiUtils]);

    const { name, height, weight, abilities, sprites } = details;
    const handleOnClick = () => {
        props.history.push(`/${name}`);
    };

    return Object.keys(details).length ? (
        <Card className={muiClasses.card}>
            <CardActionArea
                className={muiClasses.cardActionArea}
                onClick={handleOnClick}
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

DetailsCard.propTypes = {
    pokemon: PropTypes.object.isRequired,
    pokemaenApiUtils: PropTypes.object.isRequired
};

export default withRouter(DetailsCard);
