# frozen_string_literal: true
class Tag < ApplicationRecord
  ##
  # Properties
  #
  validates :name, :presence => true

  has_and_belongs_to_many :decks

  ##
  # Callbacks
  #
  ##
  # Methods
  #
end
