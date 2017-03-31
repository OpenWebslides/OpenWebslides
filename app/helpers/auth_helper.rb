# frozen_string_literal: true
module AuthHelper
  ##
  # Current user helper
  #
  def current_user
    return unless payload

    @resource ||= User.find payload['id']
  end

  ##
  # Authenticate a request
  #
  def authenticate_user
    return head :unauthorized unless payload

    expiration = DateTime.parse payload['expiration']

    # Unauthorized unless valid token
    return head :unauthorized unless current_user
    return head :unauthorized unless expiration.future?

    # Regenerate token (renews expiration date)
    add_token_to_response
  end

  def add_token_to_response
    token = OpenWebslides::Api::Authentication.encode :id => payload['id']
    response.headers['Authorization'] = "Bearer #{token}"
  end

  protected

  ##
  # Extract JWT payload from request
  #
  def payload
    return @payload if @payload

    header = request.env['HTTP_AUTHORIZATION']
    return nil unless header

    token = header.scan(/Bearer (.*)$/).flatten.last
    return nil unless token

    @payload = OpenWebslides::Api::Authentication.decode token
  rescue JWT::DecodeError
    nil
  end
end
