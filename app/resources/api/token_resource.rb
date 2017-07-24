# frozen_string_literal: true

module Api
  class TokenResource < ApiResource
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
