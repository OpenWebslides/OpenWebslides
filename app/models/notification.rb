# frozen_string_literal: true

class Notification < ApplicationRecord
  ##
  # Properties
  #
  enum :event_type => %i[deck_created deck_updated]
  validates :event_type, :presence => true

  ##
  # Associations
  #
  belongs_to :user, :required => true,
                    :inverse_of => :notifications

  belongs_to :deck, :required => true,
                    :inverse_of => :notifications

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
