# frozen_string_literal: true

JWT::Auth.configure do |config|
  ##
  # Token lifetime (in hours)
  #
  config.token_lifetime = 24.hours

  ##
  # JWT secret
  #
  config.secret = Rails.application.secrets.secret_key_base
end
