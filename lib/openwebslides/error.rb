# frozen_string_literal: true
module OpenWebslides
  class Error < StandardError; end

  class CommandError < Error; end
  class ConfigurationError < Error; end

  class TokenError < Error; end
end
