class SessionsController < ApplicationController

    #create a new session for the user logging in
    def create
        @user = User.find_by(email: session_params[:email])

        #checks if the user exists and verifies the email and password combination
        if @user && @user.authenticate(session_params[:password])
            login!
            render json: {
                logged_in: true,
                user: @user
            }
        else
            render json: {
                status: 401,
                errors: 'Invalid email or password.'
            }
        end
    end

    #check if user is logged in
    def is_logged_in?
        if logged_in? && current_user
            render json: {
                logged_in: true,
                user: current_user
            }
        else
            render json: {
                logged_in: false,
                message: 'no such user'
            }
        end
    end

    #destroy a session upon logging out
    def destroy
        logout!
        render json: {
            status: 200,
            logged_out: true
        }
    end

    private

    def session_params
        params.require(:user).permit(:email, :firstname, :lastname, :password)
    end

end