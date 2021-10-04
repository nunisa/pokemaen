import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DetailsCard from '../DetailsCard';
import { DetailsSkeleton } from '../Skeletons';

const Cards = props => {
    const { filtered, pokemaenApiUtils } = props;

    return (
        <Grid container spacing={2}>
            {filtered && filtered.results && filtered.results.length
                ? filtered.results.map(pokemon => (
                      <Grid
                          item
                          xs={6}
                          md={2}
                          key={Math.random().toString().slice(0, 6)}
                      >
                          <DetailsCard
                              pokemon={pokemon}
                              pokemaenApiUtils={pokemaenApiUtils}
                          />
                      </Grid>
                  ))
                : [...new Array(12)].fill(0).map(() => (
                      <Grid
                          item
                          xs={6}
                          md={2}
                          key={Math.random().toString().slice(0, 6)}
                      >
                          <DetailsSkeleton />
                      </Grid>
                  ))}
        </Grid>
    );
};

Cards.propTypes = {
    filtered: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    pokemaenApiUtils: PropTypes.object.isRequired
};

export default Cards;
