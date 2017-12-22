# frozen_string_literal: true

##
# Slide deck resource
#
class DeckResource < ApplicationResource
  ##
  # Attributes
  #
  attribute :name
  attribute :state
  attribute :description
  attribute :template

  ##
  # Relationships
  #
  has_one :user
  has_many :collaborators
  has_many :assets
  has_many :conversations

  ##
  # Filters
  #
  filter :name
  filter :description
  filter :state,
         :verify => ->(values, _) { values & Deck.states.keys }

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.creatable_fields(context = {})
    super(context) - %i[collaborators assets conversations]
  end

  def self.updatable_fields(context = {})
    super(context) - %i[collaborators assets conversations]
  end
end
