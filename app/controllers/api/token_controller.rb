# frozen_string_literal: true

module Api
  class TokenController < ApiController
    after_action :add_token, :only => :create

    before_action :authenticate_user, :only => :destroy

    protected

    def add_token
      # Add JWT header to response if authenticated successfully

      return unless response.status == 201
      token = JWT::Auth::Token.from_user resource
      headers['Authorization'] = "Bearer #{token.to_jwt}"
    end

    def resource
      @resource ||= User.find_by :email => auth_params[:email]
    end

    def auth_params
      params.require(:data).require(:attributes).permit :email, :password
    end
  end
end
