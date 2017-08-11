# frozen_string_literal: true

class Grant < ApplicationRecord
  ##
  # Properties
  #
  ##
  # Associations
  #
  belongs_to :deck, :required => true
  belongs_to :user, :required => true

  ##
  # Validations
  #
  validates_uniqueness_of :deck_id, :scope => :user_id

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  ##
  # Overrides
  #
  ##
  # Helpers and callback methods
  #
end
