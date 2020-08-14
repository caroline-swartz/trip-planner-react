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
            <div className="primary-color d-flex align-items-center justify-content-center">
                <h1>{this.props.currentTrip.name}</h1>
            </div>
        );
    }
}

export default Trip;