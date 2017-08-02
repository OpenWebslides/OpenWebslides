# frozen_string_literal: true

JSONAPI.configure do |config|
  config.exception_class_whitelist = [Pundit::NotAuthorizedError, JWT::Auth::UnauthorizedError]
  config.default_paginator = :offset
  config.json_key_format = :camelized_key
end
