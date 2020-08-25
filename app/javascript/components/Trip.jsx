import React from "react";
import axios from 'axios';

class Trip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stops: [],
            showAddNewStop: false,
            location: "",
            budget: 0,
            start: "",
            end: "",
            accommodation: ""
        }

        this.onChange = this.onChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddNewStop = this.handleAddNewStop.bind(this);
    }

    //updates state variables when user types in a field
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    //calls the trip controller's destroy function to delete trip from db
    handleDelete(event) {
        axios.post('http://localhost:3001/trips/destroy', this.props.currentTrip, {withCredentials: true})
        .then(response =>{
            this.props.showTrips();
            });
    }

    //called when submitting the add new stop form
    handleAddNewStop(event) {
        event.preventDefault();
        const { location, budget, start, end, accommodation} = this.state;

        //sends a post request to the stops/create function with the stop object params
        axios.post('http://localhost:3001/stops/create', {location: location, budget: budget, start: start, end: end, accommodation: accommodation, trip_id: this.props.currentTrip.id}, {withCredentials: true})
        .then(response => {
            if(response.data.status === 'created') {
                this.setState({
                    showAddNewStop: false,
                })
            }
        });
    }

    //calls the stop controller's index function to get all the stops for the specified trip
    componentDidMount() {
        axios.get('http://localhost:3001/stops/index', {params: {id: this.props.currentTrip.id}} , {withCredentials: true})
        .then(response => {
            if (this.state.stops.length != response.data.length){
                this.setState({stops: response.data});
            }
        });
    }

    //calls the stop controller's index function to get all the stops for the specified trip
    componentDidUpdate() {
        axios.get('http://localhost:3001/stops/index', {params: {id: this.props.currentTrip.id}} , {withCredentials: true})
        .then(response => {
            if (this.state.stops.length != response.data.length){
                this.setState({stops: response.data});
            }
        });
    }

    //form to add a new stop
    showAddNewStopForm = () => {
        return (
            <div className="home-form-div">
                <form className="home-form" onSubmit={this.handleAddNewStop}>
                    <div className="form-group">
                        <input type="text" name="location" id="stopLocation" className="form-control" required placeholder="Destination" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="budget" id="stopBudget" className="form-control" required placeholder="Budget" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="start" id="stopStart" className="form-control" required placeholder="Start Date (YYYY-MM-DD)" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="end" id="stopEnd" className="form-control" required placeholder="End Date (YYYY-MM-DD)" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="accommodation" id="stopAccommodation" className="form-control" required placeholder="Hotel/Airbnb Link" onChange={this.onChange}/>
                    </div>
                    <button type="submit" className="btn custom-button3">Add Stop</button>
                </form>
            </div>
        );
    }

    //display all the stops for a trip
    showAllStops = () => {
        return(
            <div className="row">
                {this.state.stops.map((stop, index) => (   
                    <div key={stop.id} className="col-md-6 col-lg-4">
                            <div className="card text-center rounded card-container mb-4">
                                <div className="card-body">
                                    <h4>{stop.location}</h4>
                                    <h6>{stop.start.substring(5,7)}/{stop.start.substring(8)}/{stop.start.substring(0,4)} - {stop.end.substring(5,7)}/{stop.end.substring(8)}/{stop.end.substring(0,4)}</h6>
                                </div>
                            </div>
                    </div>
                ))}
                <div className="col-md-6 col-lg-4">
                    <div className="card text-center rounded card-add-stop mb-4 align-items-center justify-content-center">
                        <h4 className="text-link" onClick={() => this.setState({showAddNewStop: true})}>Add a Stop</h4>
                    </div>
                </div>
            </div>
        );
    }

    //show this if there are no stops added yet
    noStops = () => {
        return (
            <div className="d-flex align-items-center justify-content-center">
                <br/><br/><br/><br/>
                <h4>No stops yet.&nbsp;</h4>
              <h4 className="text-link" onClick={() => this.setState({showAddNewStop: true})}>Add One!</h4>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="primary-color d-flex flex-column align-items-center justify-content-center">
                    <h1 className="trip-title">{this.props.currentTrip.name}</h1>
                    <h5>{this.props.currentTrip.start.substring(5,7)}/{this.props.currentTrip.start.substring(8)}/{this.props.currentTrip.start.substring(0,4)} - {this.props.currentTrip.end.substring(5,7)}/{this.props.currentTrip.end.substring(8)}/{this.props.currentTrip.end.substring(0,4)}</h5>
                    <h5>Remaining budget: &#36;{this.props.currentTrip.budget}</h5>
                    <div className="container-fluid">
                        {(this.state.showAddNewStop) ? this.showAddNewStopForm() : (this.state.stops.length === 0 && !this.state.showAddNewStop) ? this.noStops() : this.showAllStops()}

                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    {this.state.showAddNewStop ? null : 
                    <button className="btn btn-lg custom-button5" onClick={this.handleDelete}>Delete Trip</button>}
                </div>
            </div>
            
        );
    }
}

export default Trip;