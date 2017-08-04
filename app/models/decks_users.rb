# frozen_string_literal: true

class DecksUsers < ApplicationRecord
  ##
  # Properties
  #
  ##
  # Associations
  #
  belongs_to :deck, :required => true
  belongs_to :user, :required => true

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
