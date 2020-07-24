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
            errors: "",
            badLogin: false,
            badSignup: false
        };
    
        //binds these functions to be able to use the correct "this" within functions
        this.onChange = this.onChange.bind(this);
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.goToUserDashboard = this.goToUserDashboard.bind(this);
    }
    
    //something about changing characters into url escaped character codes
    stripHtmlEntities(str) {
        return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    //updates state variables when user types in a field
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    //redirect to user's dashboard
    goToUserDashboard(user) {
        this.props.history.push('/dashboard/${user.id}');
    }

    //sends a delete request and calls our App.jsx's handleLogout function for the session 
    //to be deleted then redirects back to home page
    handleLogoutClick() {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(response => {
            this.props.handleLogout()
            this.props.history.push('/')
        })
        .catch(error => console.log(error))
    }

    //handles submission event from login form
    onLoginSubmit(event) {
        event.preventDefault();
        this.setState({badLogin: false});
        const { email, firstname, lastname, password, password_confirmation} = this.state;
    
        let user = {
            email: email,
            password: password
        }
    
        //sends a post request to the 'login' route which redirects to the 
        //sessions controller's create function
        axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
        .then(response => {
            //if login was successful, call App.jsx's handleLogin function and redirect to the user's dashboard
            if(response.data.logged_in) {
                this.setState({badLogin: false})
                this.props.handleLogin(response.data);
                this.goToUserDashboard(user);
            } else {
                this.setState({
                    errors: response.data.errors,
                    badLogin: true
                });
            }
        })
        .catch(error => console.log('api errors:', error));
    }
    
    //handles submission event from signup form
    onSignupSubmit(event) {
        event.preventDefault();
        this.setState({badSignup: false});
        const { email, firstname, lastname, password, password_confirmation} = this.state;

        let user = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password,
            password_confirmation: password_confirmation
        };

        if(user.password != user.password_confirmation){
            this.setState({
                errors: "Passwords do not match.",
                badSignup: true
            });
            return;
        }

        //sends a post request to the 'users/create' route which calls the
        //users controller's create function
        axios.post('http://localhost:3001/users/create', {user}, {withCredentials: true})
        .then(response => {
            //if a user was successfully created, call App.jsx's handleLogin function
            if(response.data.status === 'created') {
                this.setState({badSignup: false})
                this.props.handleLogin(response.data);
                this.props.history.push('/users');
            } else {
                console.log(response);
                this.setState({
                    errors: response.data.errors,
                    badSignup: true
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
                {this.state.badLogin ? <p className="text-danger">{this.state.errors}</p> : null }
                <form className="home-form" onSubmit={this.onLoginSubmit}>
                    <div className="form-group">
                        <input type="text" name="email" id="userEmail" className="form-control" required placeholder="Email" onChange={this.onChange}/>
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
                {this.state.badSignup ? <p className="text-danger">{this.state.errors}</p> : null }
                <form className="home-form" onSubmit={this.onSignupSubmit}>
                    <div className="form-group">
                        <input type="text" name="firstname" id="userFirstName" className="form-control" required placeholder="First Name" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="lastname" id="userLastName" className="form-control" required placeholder="Last Name" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="email" id="userEmail" className="form-control" required placeholder="Email" onChange={this.onChange}/>
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


    componentDidUpdate(prevRender) {
        if(this.state.badLogin && this.state.showSignUp){
            this.setState({badLogin: false});
        }
        else if(this.state.badSignup && this.state.showLogin){
            this.setState({badSignup: false});
        }
    }
    
    render() {
        return (
            <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center home-background">
                <div className="jumbotron jumbotron-fluid bg-transparent">
                    <div className="container primary-color border border-secondary rounded border-padding text-center">
                        <h1 className="display-4">Welcome to Trip Planner</h1>
                        <hr id="topLine" className="my-4"/>
                        <div className="d-flex align-items-center justify-content-center">
                            {this.props.loggedInStatus ? 
                            <button className="btn btn-lg custom-button1" onClick={() => this.goToUserDashboard(this.props.currentUser)}>Home</button> :
                            <button className="btn btn-lg custom-button1" onClick={() => this.setState({showLogin: true, showSignUp: false})}>Log In</button>}
                            {this.props.loggedInStatus ? 
                            <button className="btn btn-lg custom-button2" onClick={() => this.handleLogoutClick()}>Log Out</button> :
                            <button className="btn btn-lg custom-button2" onClick={() => this.setState({showLogin: false, showSignUp: true})}>Sign Up</button>}
                        </div>
                        {this.state.showLogin ? this.showLogin() : null}
                        {this.state.showSignUp ? this.showSignUp() : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);