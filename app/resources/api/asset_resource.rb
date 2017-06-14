# frozen_string_literal: true

module Api
  ##
  # A binary asset (image, video, ...)
  #
  class AssetResource < ApiResource
    ##
    # Properties
    #
    attributes :filename

    has_one :deck

    ##
    # Filters
    #
    ##
    # Callbacks
    #
    ##
    # Methods
    #
    def self.updatable_fields(_ = {})
      []
    end
  end
end
