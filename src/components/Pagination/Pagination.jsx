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
        marginLeft: 'auto'
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
    const { limit, disablePrevBtn, disableNextBtn, onSizeChange, onBtnClick } =
        props;

    const handlePageSizeChange = e => {
        onSizeChange(e.target.value);
    };
    const handlePrevNext = name => () => {
        onBtnClick(name);
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
                >
                    {[10, 20, 50].map(item => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
                <Box component="span" className={muiClasses.mr2}>
                    pokemons per page
                </Box>
            </Box>
            <Box className={muiClasses.prevNext}>
                <Tooltip title="Previous" arrow>
                    <Box component="span">
                        <IconButton
                            disabled={disablePrevBtn}
                            onClick={handlePrevNext('prev')}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Box>
                </Tooltip>
                <Tooltip title="Next" arrow>
                    <Box component="span">
                        <IconButton
                            disabled={disableNextBtn}
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
    disablePrevBtn: PropTypes.bool.isRequired,
    disableNextBtn: PropTypes.bool.isRequired,
    onSizeChange: PropTypes.func.isRequired,
    onBtnClick: PropTypes.func.isRequired
};

export default Pagination;
