# frozen_string_literal: true

module Auth
  class AuthController < ApplicationController
    include JWT::Auth::Authentication

    before_action :authenticate, :only => [:token]

    ##
    # Obtain a JWT
    #
    def token
      unless resource.confirmed?
        return render :json => { :error => 'Your account has not been activated yet.' }, :status => :forbidden
      end

      token = JWT::Auth::Token.from_user resource
      render :json => { :jwt => token.to_jwt }, :status => :created
    end

    ##
    # Confirm a user's email
    #
    def confirm
      if User.confirm_by_token params[:confirmation_token]
        head :ok
      else
        render :json => { :error => 'invalid or missing confirmation_token' }, :status => :forbidden
      end
    end

    protected

    def authenticate
      head :unauthorized unless resource && resource.authenticate(auth_params[:password])
    end

    def resource
      @resource ||= User.find_by :email => auth_params[:email]
    end

    def auth_params
      params.require(:auth).permit :email, :password
    end
  end
end
