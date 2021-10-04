import { makeStyles } from '@material-ui/core/styles';

// MUI custom styles
const muiStyles = makeStyles(theme => ({
    displayType: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        height: `calc(100vh - ${theme.spacing(4)}px)`
    },
    img: {
        height: theme.spacing(30),
        width: theme.spacing(30),
        backgroundImage: `url(${
            require('../../assets/images/broken-pokeball.png').default
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
    },
    text: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(1, 2),
        fontSize: theme.spacing(4),
        color: 'orange'
    }
}));

const NotFound = () => {
    const muiClasses = muiStyles();

    return (
        <div className={muiClasses.displayType}>
            <div className={muiClasses.img}></div>
            <div className={muiClasses.text}>Uh-oh! Page not found</div>
        </div>
    );
};

export default NotFound;
