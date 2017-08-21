# frozen_string_literal: true

##
# Token resource (returns an authentication token)
#
class TokenResource < ApplicationResource
  abstract

  ##
  # Attributes
  #
  attribute :email
  attribute :password

  ##
  # Relationships
  #
  ##
  # Filters
  #
  ##
  # Callbacks
  #
  ##
  # Methods
  #
end
