import React from "react";

class Trip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: ""
        }

    }

    render() {
        return (
            <div className="primary-color d-flex flex-column align-items-center justify-content-center">
                <h1>{this.props.currentTrip.name}</h1>
                <h2>{this.props.currentTrip.start.substring(5,7)}/{this.props.currentTrip.start.substring(8)}/{this.props.currentTrip.start.substring(0,4)} - {this.props.currentTrip.end.substring(5,7)}/{this.props.currentTrip.end.substring(8)}/{this.props.currentTrip.end.substring(0,4)}</h2>
                <h2>Remaining budget: &#36;{this.props.currentTrip.budget}</h2>
            </div>
        );
    }
}

export default Trip;