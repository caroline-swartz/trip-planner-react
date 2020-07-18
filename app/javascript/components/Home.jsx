import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            signup: false,
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    stripHtmlEntities(str) {
        return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSignupSubmit(event) {
        event.preventDefault();
        const url = "/users/create";
        const { email, firstname, lastname, password } = this.state;

        if (email.length == 0 || firstname.length == 0 || lastname.length == 0 || password.length == 0)
            return;

        const body = {
            email,
            firstname,
            lastname,
            password
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => this.props.history.push('/users'))
        .catch(error => console.log(error.message));
    }

    showLogin = () => {
        document.getElementById("topLine").style.visibility = "hidden";
        return(
            <div>
                <hr className="my-4"/>
                <div className="offset-lg-4">
                    <form className="w-50">
                        <div className="form-group">
                            <input type="text" name="email" id="userEmail" className="form-control" required placeholder="Email"/>
                        </div>
                            <div className="form-group">
                                <input type="text" name="password" id="userPassword" className="form-control" required placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn custom-button3">Log In</button>
                    </form>
                </div>
            </div>
        );
    }

    showSignUp = () => {
        document.getElementById("topLine").style.visibility = "hidden";
        return(
            <div>
                <hr className="my-4"/>
                <div className="offset-lg-4">
                    <form className="w-50" onSubmit={this.onSignupSubmit}>
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
                            <input type="text" name="password" id="userPassword" className="form-control" required placeholder="Password" onChange={this.onChange}/>
                        </div>
                        <button type="submit" className="btn custom-button3">Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center home-background">
                <div className="jumbotron jumbotron-fluid bg-transparent">
                    <div className="container primary-color border border-secondary rounded border-padding">
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
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;