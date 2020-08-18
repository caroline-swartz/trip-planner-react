import React from "react";
import axios from 'axios';

class Trip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: ""
        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        axios.post('http://localhost:3001/trips/destroy', this.props.currentTrip, {withCredentials: true})
        .then(response =>{
            this.props.showTrips();
            });
    }

    render() {
        return (
            <div className="primary-color d-flex flex-column align-items-center justify-content-center">
                <h1>{this.props.currentTrip.name}</h1>
                <h2>{this.props.currentTrip.start.substring(5,7)}/{this.props.currentTrip.start.substring(8)}/{this.props.currentTrip.start.substring(0,4)} - {this.props.currentTrip.end.substring(5,7)}/{this.props.currentTrip.end.substring(8)}/{this.props.currentTrip.end.substring(0,4)}</h2>
                <h2>Remaining budget: &#36;{this.props.currentTrip.budget}</h2>
                <button className="btn btn-lg custom-button2" onClick={this.handleDelete}>Delete</button>
            </div>
        );
    }
}

export default Trip;