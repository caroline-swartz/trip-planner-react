class UsersController < ApplicationController
  #get all users in the database
  def index
    user = User.all.order(created_at: :desc)
    render json: user
  end

  #add a new user to db
  def create
    user = User.create!(user_params)
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  #show a specific user's dashboard
  def show
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  #delete a user from the db
  def destroy
    user&.destroy
    render json: {message: 'Sorry to see you go! Your account has been successfully deleted.'}
  end

  private 

  def user_params
    params.permit(:email, :firstname, :lastname, :password_digest)
  end

  def user
    @user ||= User.find(params[:id])
  end
end
