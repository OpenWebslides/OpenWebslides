# frozen_string_literal: true

module OpenWebslides
  class Error < StandardError; end

  ##
  # Core errors
  #
  class CommandError < Error; end
  class ConfigurationError < Error; end
end
