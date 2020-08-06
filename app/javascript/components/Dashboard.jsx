import React from "react";
import axios from 'axios';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            budget: 0,
            start: "",
            end: "",
            badTrip: false,
            showCreateTripForm: false,
            errors: ""
        };

        this.onChange = this.onChange.bind(this);
        this.handleCreateNewTrip = this.handleCreateNewTrip.bind(this);
    }

    //updates state variables when user types in a field
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    //this is called when the new trip form is submitted
    handleCreateNewTrip(event) {
        event.preventDefault();
        const { name, budget, start, end, errors} = this.state;

        //create the trip object to send in the post request
        let trip = {
            name: name,
            budget: budget,
            start: start,
            end: end
        };

        //sends a post request to the trips/create function with the trip object we made above
        axios.post('http://localhost:3001/trips/create', {trip}, {withCredentials: true})
        .then(response => {
            //if a trip was successfully created, refresh the page to reflect updates
            if(response.data.status === 'created') {
                this.setState({
                    badTrip: false,
                    showCreateTripForm: false
                })
                this.props.history.push('/dashboard');
            } else { //this means the trip was unsuccessful, display errors
                this.setState({
                    errors: response.data.errors,
                    badTrip: true
                });
            }
        })
        .catch(error => console.log('api errors:', error));
    }

    //when the "new trip button is clicked, this form will appear"
    showCreateNewTripForm = () => {
        return(
            <div className="home-form-div">
                <hr className="my-4"/>
                {this.state.badTrip ? <p className="text-danger">{this.state.errors}</p> : null }
                <form className="home-form" onSubmit={this.handleCreateNewTrip}>
                    <div className="form-group">
                        <input type="text" name="name" id="tripName" className="form-control" required placeholder="Name" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="budget" id="tripBudget" className="form-control" required placeholder="Budget" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="start" id="tripStart" className="form-control" required placeholder="Start Date (YYYY-MM-DD)" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="end" id="tripEnd" className="form-control" required placeholder="End Date (YYYY-MM-DD)" onChange={this.onChange}/>
                    </div>
                    <button type="submit" className="btn custom-button3">Create Trip</button>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div>
                <p>{this.props.currentUser.firstname}'s Dashboard</p>
                <button className="btn btn-lg custom-button4" onClick={() => this.setState({showCreateTripForm: true})}>New Trip</button>
                {this.state.showCreateTripForm ? this.showCreateNewTripForm() : null}
            </div>
        );
    }
}

export default Dashboard;