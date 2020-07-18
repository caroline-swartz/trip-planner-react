import React from "react";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        firstname: "",
        lastname: "",
        password: ""
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }
  
    stripHtmlEntities(str) {
        return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
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
        .then(response => this.props.history.push('/user/${response.id}'))
        .catch(error => console.log(error.message));
    }

    render() {
        return (
            <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
                <div className="row">
                    <div className="col-xs-3 offset-lg-3">
                        <h1 className="font-weight-normal mb-5 text-center">Sign Up</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="userEmail">Email</label>
                                    <input type="text" name="email" id="userEmail" className="form-control" required onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userFirstName">First Name</label>
                                    <input type="text" name="firstname" id="userFirstName" className="form-control" required onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userLastName">Last Name</label>
                                    <input type="text" name="lastname" id="userLastName" className="form-control" required onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userPassword">Password</label>
                                    <input type="text" name="password" id="userPassword" className="form-control" required onChange={this.onChange}/>
                            </div>
                            <button type="submit" className="btn custom-button3">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        );
      }
}

  export default SignUp;