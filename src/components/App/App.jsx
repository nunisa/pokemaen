import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from '../Home';
import DetailInfo from '../DetailInfo';
import NotFound from '../NotFound';

const App = () => (
    <Router basename={process.env.PUBLIC_URL}>
        <CssBaseline />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:pname" component={DetailInfo} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export default App;
