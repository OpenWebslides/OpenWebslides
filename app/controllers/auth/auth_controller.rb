# frozen_string_literal: true

module Auth
  class AuthController < ApplicationController
    include JWT::Auth::Authentication

    # Require { :auth => { :user => ..., :password => ... } }
    before_action :authenticate, :only => [:token]

    # Require JWT
    before_action :authenticate_user, :only => [:expire]

    rescue_from JWT::Auth::UnauthorizedError, :with => :user_not_authenticated

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
    # Expire all user sessions
    #
    def expire
      current_user.increment_token_version!
      head :ok
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

    def user_not_authenticated
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      error = JSONAPI::Error.new :code => JSONAPI::UNAUTHORIZED,
                                 :status => :unauthorized,
                                 :title => "#{params[:action].capitalize} unauthorized",
                                 :detail => "You don't have permission to #{params[:action]} this #{type}."

      render :json => { :errors => [error] }, :status => 401
    end
  end
end
