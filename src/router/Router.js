import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from '../components/Admin';
import Adminlogin from '../components/Adminlogin';
import Home from '../components/Home';
import Login from '../components/login';
import ShowBookings from '../components/showbookings';
import UserHome from '../components/user_home';

function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Home} />
        <Route exact path='/home/:address/:id' component={UserHome} />
        <Route exact path='/bookings' component={ShowBookings} />
        <Route exact path="/logout" component={()=>{
          localStorage.removeItem("vaccine_login");
          window.location.href = "http://localhost:3000/";
          return(
            <Login />
          )
        }} />
        <Route exact path="/adminlogin" component={Adminlogin} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default Routing;
