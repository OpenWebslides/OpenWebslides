# frozen_string_literal: true

module Api
  class DeckResource < ApiResource
    ##
    # Properties
    #
    attributes :name, :state, :description

    has_one :owner

    has_many :contributors

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
    def self.creatable_fields(context = {})
      super(context) - %i[contributors tags]
    end

    def self.updatable_fields(context = {})
      super(context) - %i[contributors]
    end
  end
end
