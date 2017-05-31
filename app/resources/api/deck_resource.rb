# frozen_string_literal: true

module Api
  class DeckResource < ApiResource
    ##
    # Properties
    #
    attributes :name, :state, :description, :template

    has_one :owner, :foreign_key => 'user_id'
    has_many :collaborators

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
      super(context) - %i[collaborators]
    end

    def self.updatable_fields(context = {})
      super(context) - %i[collaborators]
    end
  end
end
