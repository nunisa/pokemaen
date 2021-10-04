import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

// MUI custom styles
const muiStyles = makeStyles(theme => ({
    selectPageSize: {
        marginLeft: 'auto',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        }
    },
    prevNext: {
        '& > span': {
            display: 'inline-flex',
            '&:nth-child(1)': {
                marginRight: theme.spacing(2)
            }
        }
    },
    mr1075: {
        marginRight: theme.spacing(1.75)
    },
    mr2: {
        marginRight: theme.spacing(2)
    }
}));

const Pagination = props => {
    const muiClasses = muiStyles();
    const { limit, offset, filtered, onSizeChange, onBtnClick } = props;

    const handlePageSizeChange = e => {
        onSizeChange(e.target.value);
    };
    const handlePrevNext = name => () => {
        let newOffset = offset;
        if (name === 'next') {
            newOffset += limit;
            newOffset =
                newOffset >= filtered.count ? filtered.count : newOffset;
        } else {
            newOffset -= limit;
            newOffset = newOffset < limit ? 0 : newOffset;
        }
        onBtnClick(newOffset);
    };

    return (
        <>
            <Box className={muiClasses.selectPageSize}>
                <Box component="span" className={muiClasses.mr2}>
                    Show
                </Box>
                <Select
                    value={limit}
                    onChange={handlePageSizeChange}
                    className={muiClasses.mr1075}
                    id="limit-per-page"
                >
                    {[10, 20, 50].map(item => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
                <Box component="span" className={muiClasses.mr2}>
                    per page
                </Box>
            </Box>
            <Box className={muiClasses.prevNext}>
                <Tooltip title="Previous" arrow>
                    <Box component="span">
                        <IconButton
                            disabled={!filtered || (filtered && offset <= 0)}
                            onClick={handlePrevNext('prev')}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Box>
                </Tooltip>
                <Tooltip title="Next" arrow>
                    <Box component="span">
                        <IconButton
                            disabled={
                                !filtered ||
                                (filtered && offset >= filtered.count)
                            }
                            onClick={handlePrevNext('next')}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>
                </Tooltip>
            </Box>
        </>
    );
};

Pagination.propTypes = {
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    filtered: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSizeChange: PropTypes.func.isRequired,
    onBtnClick: PropTypes.func.isRequired
};

export default Pagination;
