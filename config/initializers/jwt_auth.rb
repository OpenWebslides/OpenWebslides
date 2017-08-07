# frozen_string_literal: true

require_relative '../openwebslides'

JWT::Auth.configure do |config|
  ##
  # Token lifetime (in hours)
  #
  config.token_lifetime = OpenWebslides.config.api.token_lifetime

  ##
  # JWT secret
  #
  config.secret = Rails.application.secrets.secret_key_base
end
