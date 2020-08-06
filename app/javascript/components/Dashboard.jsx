import React from "react";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
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