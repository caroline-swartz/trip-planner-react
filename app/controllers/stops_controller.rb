class StopsController < ApplicationController
  def index
    trip = Trip.find(params[:id])
    stops = trip.stops
    render json: stops
  end

  def show
  end

  def create
    @trip = Trip.find(params[:trip_id])
    @stop = @trip.stops.new(stop_params)
    if @stop.save
      render json: {
        status: :created,
        stop: @stop
      }
    else
      render json: {
        status: 500,
        errors: @stop.errors.full_messages
      }
    end
  end

  def edit
  end

  def destroy
  end

  private
  def stop_params
    params.require(:stop).permit(:location, :budget, :start, :end, :accommodation, :trip_id)
  end
end
