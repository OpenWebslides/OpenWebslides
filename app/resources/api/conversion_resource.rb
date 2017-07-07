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
    attributes :name, :status, :created_at

    has_one :deck
    has_one :user

    ##
    # Filters
    #
    filter :status

    ##
    # Callbacks
    #
    ##
    # Methods
    #
    def created_at
      @model.created_at.to_i.to_s
    end

    def self.creatable_fields(_ = {})
      []
    end
  end
end
