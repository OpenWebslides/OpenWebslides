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
    attributes :status, :created_at

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
    def created_at
      @model.created_at.to_i.to_s
    end
  end
end
