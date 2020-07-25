import React from "react";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    render() {
        console.log(this.props.currentUser);
        return (
            <div>
                <p>{this.props.currentUser.firstname}'s Dashboard</p>
            </div>
        );
    }
}

export default Dashboard;