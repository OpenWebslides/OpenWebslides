# frozen_string_literal: true

module Api
  class TokenController < ApiController
    before_action :authenticate_user, :only => :destroy
    after_action :add_token, :only => :create

    ##
    # Expire all JWT
    #
    # def destroy
    #   current_user.increment_token_version!
    #
    #   headers.delete 'Authorization'
    #   head :no_content
    # end

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
