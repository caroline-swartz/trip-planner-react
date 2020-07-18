import React, { Component } from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-transparent">
                    <div className="container secondary-color">
                        <h1 className="display-4">Login</h1>
                        <hr className="my-4"/>
                        <form className="border border-secondary rounded custom-form1">
                            <div className="form-group">
                                <label for="emailInput">Email address</label>
                                <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div class="form-group">
                                <label for="passwordInput">Password</label>
                                <input type="password" class="form-control" id="passwordInput" placeholder="Password"/>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;