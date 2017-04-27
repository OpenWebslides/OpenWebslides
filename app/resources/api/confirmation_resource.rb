# frozen_string_literal: true

module Api
  class ConfirmationResource < ApiResource
    abstract

    ##
    # Properties
    #
    attribute :confirmation_token

    has_one :user

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
