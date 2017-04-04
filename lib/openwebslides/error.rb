# frozen_string_literal: true

module OpenWebslides
  class Error < StandardError; end

  ##
  # Core errors
  #
  class CommandError < Error; end
  class ConfigurationError < Error; end

  ##
  # Authentication errors
  #
  class TokenError < Error; end

  ##
  # Authorization errors
  #
  class NotAuthorizedError < Error; end
end
