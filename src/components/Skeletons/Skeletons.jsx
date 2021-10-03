import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

// MUI custom styles
const muiStyles = makeStyles(theme => ({
    displayType: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    mediaImg: {
        margin: '0 auto',
        marginBottom: theme.spacing(3)
    },
    details: {
        marginBottom: theme.spacing(0.75),
        padding: theme.spacing(1, 2)
    }
}));

export const DetailsSkeleton = () => {
    const muiClasses = muiStyles();

    return (
        <Card className={muiClasses.displayType}>
            <CardActionArea>
                <CardContent>
                    <Skeleton
                        variant="circle"
                        width={120}
                        height={120}
                        className={muiClasses.mediaImg}
                    />
                    <Skeleton variant="text" className={muiClasses.details} />
                    <Skeleton variant="text" className={muiClasses.details} />
                    <Skeleton variant="text" className={muiClasses.details} />
                    <Skeleton variant="text" className={muiClasses.details} />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
