# frozen_string_literal: true

module Api
  class DeckResource < ApiResource
    ##
    # Properties
    #
    attributes :name, :state, :description

    has_one :owner

    has_many :contributors
    has_many :tags

    ##
    # Filters
    #
    filters :name, :description
    filter :state, :verify => ->(values, _) { values & Deck.states.keys }

    ##
    # Callbacks
    #
    ##
    # Methods
    #
    def self.creatable_fields
      super - %i[contributors tags]
    end

    def self.updatable_fields
      super - %i[contributors]
    end
  end
end
