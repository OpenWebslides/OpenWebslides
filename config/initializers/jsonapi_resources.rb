# frozen_string_literal: true

JSONAPI.configure do |config|
  config.default_processor_klass = JSONAPI::Authorization::AuthorizingProcessor
  config.exception_class_whitelist = [Pundit::NotAuthorizedError, JWT::Auth::UnauthorizedError]
  config.default_paginator = :offset
  config.json_key_format = :camelized_key

  # Add missing HTTP status codes
  JSONAPI::UNAUTHORIZED = '401'
  JSONAPI::UNPROCESSABLE_ENTITY = '422'
end
