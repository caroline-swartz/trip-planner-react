import React from 'react';
import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
                <div className="jumbotron jumbotron-fluid bg-transparent">
                    <div className="container secondary-color">
                        <h1 className="display-4">Welcome To Trip Planner</h1>
                        <hr className="my-4"/>
                        <Link to="/login" className="btn btn-lg custom-button1" role="button">
                            Log In
                        </Link>
                        <Link to="/signup" className="btn btn-lg custom-button2" role="button">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;