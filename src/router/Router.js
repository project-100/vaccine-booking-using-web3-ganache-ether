import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "../components/Home"
import Login from '../components/login';
import UserHome from '../components/user_home';

function Routing(){

    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/register" component={Home} />
                <Route exact path="/userhome/:address" component={UserHome}/>
            </Switch>
        </Router>
    )
}

export default Routing;