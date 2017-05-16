# frozen_string_literal: true

module OpenWebslides
  class Error < StandardError; end

  ##
  # Core errors
  #
  class CommandError < Error; end
  class ConfigurationError < Error; end
  class RepoExistsError < Error; end

  ##
  # Unconfirmed account
  #
  class UnconfirmedError < Error; end
end
