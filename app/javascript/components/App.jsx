import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home"
import Users from "../components/Users";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }

    componentDidMount() {
        this.loginStatus();
    }

    componentWillMount() {
        return this.props.loggedInStatus ? this.redirect() : null
    }

    /**This is the backbone of our front-end authorization system. The 'GET request
    * along with the argument {withCredentials: true} allows our Rails server
    * to set and read the cookie on the front-end's browser. If the user is 
    * verified in the Rails server, then a logged_in boolean is returned, along 
    * with the user object. We use this response data to maintain the logged in
    * status in the front-end.
    **/
   loginStatus = () => {
        axios.get('http://localhost:3001/logged_in', {withCredentials: true})
        .then(response => {
            if (response.data.logged_in) {
                this.handleLogin(response);
            } else {
                this.handleLogout();
            }
        })
        .catch(error => console.log('api errors:', error));
    }

    //control the login status of the application and user data

    handleLogin = (data) => {
        this.setState({
            isLoggedIn: true,
            user: data.user //data is the response data we receive from the server
        })
    }

    handleLogout = () => {
        this.setState({
            isLoggedIn: false,
            user: {}
        })
    }

    /**The app component is actively checking the logged in status of the user.
    * This new logic will allow us to pass this status to other components that
    * require user authentication.
    **/
   render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route 
                            exact path='/' 
                            render={props => (
                                <Home {...props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
                            )}
                        />
                        <Route path="/users" exact component={Users} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;