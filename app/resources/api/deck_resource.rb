# frozen_string_literal: true

module Api
  class DeckResource < ApiResource
    ##
    # Properties
    #
    attributes :name, :state

    has_one :owner

    has_many :contributors
    has_many :tags

    ##
    # Callbacks
    #
    ##
    # Methods
    #
  end
end
