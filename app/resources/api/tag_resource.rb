# frozen_string_literal: true

module Api
  class TagResource < ApiResource
    ##
    # Properties
    #
    attributes :name

    has_many :decks

    ##
    # Callbacks
    #
    ##
    # Methods
    #
  end
end
