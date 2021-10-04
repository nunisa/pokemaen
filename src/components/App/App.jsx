import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from '../Home';

const App = () => (
    <Router>
        <CssBaseline />
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </Router>
);

export default App;
