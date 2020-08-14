class TripsController < ApplicationController
  def index
    trips = current_user.trips
    render json: trips
  end

  def show
    @trip = Trip.find(params[:id])
    if @trip
      render json: @trip
    else
      render json: @trip.errors
    end
  end

  #creates a new trip for the current user who is logged in
  def create
    @trip = current_user.trips.new(trip_params)
    if @trip.save
      render json: {
        status: :created,
        trip: @trip
      }
    else
      render json: {
        status: 500,
        errors: @trip.errors.full_messages
      }
    end
  end

  def edit
  end

  def destroy
  end

  private 

  def trip_params
    params.require(:trip).permit(:name, :budget, :start, :end)
  end

end
