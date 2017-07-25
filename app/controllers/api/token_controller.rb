# frozen_string_literal: true

module Api
  class TokenController < ApiController
    # Authentication
    before_action :authenticate_user, :only => :destroy
    prepend_before_action :add_dummy_id

    # Authorization
    after_action :verify_authorized

    # POST /token
    def create
      @user = User.find_by :email => resource_params[:email]

      raise Api::UnauthorizedError unless @user
      raise Api::UnauthorizedError unless @user.valid_password?(resource_params[:password])
      raise Api::UnconfirmedError unless @user.confirmed?

      authorize :token

      token = JWT::Auth::Token.from_user @user
      headers['Authorization'] = "Bearer #{token.to_jwt}"

      jsonapi_render :json => @user, :status => :created
    end

    # DELETE /token
    def destroy
      authorize :token

      current_user.increment_token_version!

      head :no_content
    end

    protected

    def add_dummy_id
      # JSONAPI::Resources requires an :id attribute
      params[:id] = 0
    end
  end
end
