import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from '../Home';
import DetailInfo from '../DetailInfo';

const App = () => (
    <Router>
        <CssBaseline />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:pname" component={DetailInfo} />
        </Switch>
    </Router>
);

export default App;
