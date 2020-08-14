import React from "react";
import axios from 'axios';
import Trip from "../components/Trip"
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            budget: 0,
            start: "",
            end: "",
            badTrip: false,
            showWhich: "allTrips",
            backButton: false,
            errors: "",
            trips: [],
            trip: {}
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

    //when the "new trip" button is clicked, the trips will hide and this form will appear
    showCreateNewTripForm = () => {
        return(
            <div className="home-form-div">
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

    //show the list of trips
    showAllTrips = () => {
        return(
            <div className="row">
                {this.state.trips.map((trip, index) => (   
                    <div key={trip.id} className="col-md-6 col-lg-4">
                            <div className="card text-center rounded card mb-4" onClick={() => this.setState({showWhich: "singleTrip", backButton: true, trip: trip})}>
                                <div className="card-body">
                                <h5 className="card-title">{trip.name}</h5>
                                </div>
                            </div>
                    </div>
                ))}
            </div>
        );
    }

    //show information for a single trip the user clicks on
    showSingleTrip = () => {
        return(
            <div>
                <Trip currentTrip={this.state.trip}/>
            </div>
        );
    }

    componentDidMount() {
        const url = "trips/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Couldn't get user's trips");
            })
            .then(response => {
                if (this.state.trips.length != response.length){
                    this.setState({trips: response});
                }
            })
    }

    //get all trips for user and update state if trip was added or deleted
    componentDidUpdate() {
        const url = "trips/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Couldn't get user's trips");
            })
            .then(response => {
                if (this.state.trips.length != response.length){
                    this.setState({trips: response});
                }
            })
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-row align-items-center clearfix">
                    <h1 className="heading">{this.props.currentUser.firstname}'s Trips</h1>
                    {this.state.backButton ? 
                        <button className="btn btn-lg custom-button4" onClick={() => this.setState({showWhich: "allTrips", backButton: false})}>All Trips</button> :
                        <button className="btn btn-lg custom-button4" onClick={() => this.setState({showWhich: "newTripForm", backButton: true})}>New Trip</button>}
                </div>
                <hr id="topLine" className="my-4"/>
                <div className="container">
                    {(this.state.showWhich === "newTripForm") ? this.showCreateNewTripForm() : (this.state.showWhich === "allTrips") ? this.showAllTrips(): this.showSingleTrip()}
                </div>
            </div>
        );
    }
}

export default Dashboard;