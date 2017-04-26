# frozen_string_literal: true

module Api
  class TokenController < ApiController
    include JWT::Auth::Authentication

    before_action :verify_content_type_header
    before_action :authenticate_user, :except => :create

    # skip_after_action :add_token_to_response, :except => :create

    ##
    # Create a JWT
    #
    def create
      raise Api::UnauthorizedError unless resource
      raise Api::UnauthorizedError unless resource.valid_password?(auth_params[:password])
      raise Api::UnconfirmedError unless resource.confirmed?

      token = JWT::Auth::Token.from_user resource
      headers['Authorization'] = "Bearer #{token.to_jwt}"
      head :created
    end

    ##
    # Expire all JWT
    #
    def expire
      current_user.increment_token_version!
      head :ok
    end

    protected

    def resource
      @resource ||= User.find_by :email => auth_params[:email]
    end

    def auth_params
      params.require(:data).require(:attributes).permit :email, :password
    end
  end
end
