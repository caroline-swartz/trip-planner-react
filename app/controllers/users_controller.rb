class UsersController < ApplicationController

  #get all users in the database
  def index
    user = User.all.order(created_at: :desc)
    render json: user
  end

  #show a specific user's dashboard
  def show
    @user = User.find(params[:id])
    if @user
      render json: {
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: ['user not found']
      }
    end
  end


  #add a new user to db
  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: {
        status: :created,
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: @user.errors.full_messages
      }
    end
  end

  #delete a user from the db
  def destroy
    user&.destroy
    render json: {message: 'Sorry to see you go! Your account has been successfully deleted.'}
  end

  private 

  def user_params
    params.require(:user).permit(:email, :firstname, :lastname, :password, :password_confirmation)
  end

end
