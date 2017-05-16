# frozen_string_literal: true

module Api
  class ConfirmationResource < JSONAPI::Resource
    abstract

    ##
    # Properties
    #
    attribute :confirmation_token

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
