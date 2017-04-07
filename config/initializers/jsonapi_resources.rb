# frozen_string_literal: true

JSONAPI.configure do |config|
  config.default_processor_klass = JSONAPI::Authorization::AuthorizingProcessor
  config.exception_class_whitelist = [Pundit::NotAuthorizedError, JWT::Auth::UnauthorizedError]

  # Manually add missing 401 unauthorized
  JSONAPI::UNAUTHORIZED = '401'
end
