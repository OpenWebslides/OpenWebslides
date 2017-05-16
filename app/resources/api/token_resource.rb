# frozen_string_literal: true

module Api
  class TokenResource < JSONAPI::Resource
    abstract

    ##
    # Properties
    #
    attributes :email, :password

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
end
