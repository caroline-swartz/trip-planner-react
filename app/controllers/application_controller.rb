class ApplicationController < ActionController::Base
    #prevents Rails from using its authenticity token so we don’t receive ‘forbidden’ parameters
    skip_before_action :verify_authenticity_token

    #HELPER FUNCTIONS-WE CAN USE THESE IN ANY CONTROLLER :)
    helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!

    def login!
        session[:user_id] = @user.id
    end

    def logged_in?
        !!session[:user_id]
    end

    #gets the current user --- can then use current_user variable in any controller!
    def current_user
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

    def authorized_user?
        @user == current_user
    end

    def logout!
        session.clear
    end
end
