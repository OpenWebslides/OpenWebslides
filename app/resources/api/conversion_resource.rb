# frozen_string_literal: true

module Api
  ##
  # A conversion job
  #
  class ConversionResource < ApiResource
    immutable

    ##
    # Properties
    #
    attributes :status

    has_one :deck
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
