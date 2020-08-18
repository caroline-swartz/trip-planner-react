class TripsController < ApplicationController

  before_action :set_trip, only: [:show, :destroy]

  def index
    trips = current_user.trips
    render json: trips
  end

  def show
    if @trip
      render json: @trip
    else
      render json: @trip.errors
    end
  end

  #creates a new trip for the current user who is logged in
  def create
    trip = current_user.trips.new(trip_params)
    if trip.save
      render json: {
        status: :created,
        trip: trip
      }
    else
      render json: {
        status: 500,
        errors: trip.errors.full_messages
      }
    end
  end

  def edit
  end

  def destroy
    @trip.destroy
    render json: {
      status: :deleted
    }
  end

  private 

  def set_trip
    @trip = Trip.find(params[:id])
  end

  def trip_params
    params.require(:trip).permit(:name, :budget, :start, :end)
  end

end
