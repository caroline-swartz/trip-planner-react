import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            signup: false,
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password_confirmation: "",
            errors: ""
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    componentWillMount() {
        return this.props.loggedInStatus ? this.redirect() : null
    }
    
    stripHtmlEntities(str) {
        return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    //updates state variables when user types in a field
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleLogoutClick() {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(response => {
            this.props.handleLogout()
            this.props.history.push('/')
        })
        .catch(error => console.log(error))
    }
    
    //TODO add login form submission event handler

    //handles submission event from sign up form
    onLoginSubmit(event) {
        event.preventDefault();
        const { email, firstname, lastname, password, password_confirmation} = this.state;
    
        let user = {
            email: email,
            password: password
        }
    
        axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
        .then(response => {
            if(response.data.logged_in) {
                this.props.handleLogin(response.data);
                this.props.history.push('/dashboard/${user.id}');
            } else {
                this.setState({
                    errors: response.data.errors
                });
                console.log(response);
            }
        })
        .catch(error => console.log('api errors:', error));
    }
    
    onSignupSubmit(event) {
        event.preventDefault();
        const { email, firstname, lastname, password, password_confirmation} = this.state;

        let user = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password,
            password_confirmation: password_confirmation
        };

        axios.post('http://localhost:3001/users/create', {user}, {withCredentials: true})
        .then(response => {
            if(response.data.status === 'created') {
                this.props.handleLogin(response.data);
                this.props.history.push('/users');
            } else {
                this.setState({
                    errors: response.data.errors
                });
            }
        })
        .catch(error => console.log('api errors:', error));
    }

    //the login form to be displayed 
    showLogin = () => {
        document.getElementById("topLine").style.visibility = "hidden";
        return(
            <div className="home-form-div">
                <hr className="my-4"/>
                <form className="home-form" onSubmit={this.onLoginSubmit}>
                    <div className="form-group">
                        <input type="email" name="email" id="userEmail" className="form-control" required placeholder="Email" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" id="userPassword" className="form-control" required placeholder="Password" onChange={this.onChange}/>
                    </div>
                    <button type="submit" className="btn custom-button3">Log In</button>
                </form>
            </div>
        );
    }

    //the sign up form to be displayed
    showSignUp = () => {
        document.getElementById("topLine").style.visibility = "hidden";
        return(
            <div className="home-form-div">
                <hr className="my-4"/>
                <form className="home-form" onSubmit={this.onSignupSubmit}>
                    <div className="form-group">
                        <input type="text" name="firstname" id="userFirstName" className="form-control" required placeholder="First Name" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="lastname" id="userLastName" className="form-control" required placeholder="Last Name" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" id="userEmail" className="form-control" required placeholder="Email" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" id="userPassword" className="form-control" required placeholder="Password" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password_confirmation" id="userPasswordConfirmation" className="form-control" required placeholder="Confirm Password" onChange={this.onChange}/>
                    </div>
                    <button type="submit" className="btn custom-button3">Sign Up</button>
                </form>
            </div>
        )
    }

    handleErrors = () => {
        return (
          <div>
            <ul>
            {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
              })}
            </ul>
          </div>
        )
      }
    
    render() {
        return (
            <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center home-background">
                <div className="jumbotron jumbotron-fluid bg-transparent">
                    <div className="container primary-color border border-secondary rounded border-padding text-center">
                        <h1 className="display-4">Welcome to Trip Planner</h1>
                        <hr id="topLine" className="my-4"/>
                        <div className="d-flex align-items-center justify-content-center">
                            <button className="btn btn-lg custom-button1" onClick={() => this.setState({showLogin: true, showSignUp: false})}>
                                Log In
                            </button>
                            <button className="btn btn-lg custom-button2" onClick={() => this.setState({showLogin: false, showSignUp: true})}>
                                Sign Up
                            </button>
                        </div>
                        {this.state.showLogin ? this.showLogin() : null}
                        {this.state.showSignUp ? this.showSignUp() : null}
                        {this.props.loggedInStatus ? <Link to='/logout' onClick={this.handleLogoutClick}>Log Out</Link> : null}
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Home);