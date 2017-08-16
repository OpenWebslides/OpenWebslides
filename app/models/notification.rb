# frozen_string_literal: true

##
# A notification for the social feed
#
class Notification < ApplicationRecord
  ##
  # Properties
  #
  enum :event_type => %i[deck_created deck_updated]

  ##
  # Associations
  #
  belongs_to :user,
             :required => true,
             :inverse_of => :notifications

  belongs_to :deck,
             :required => true,
             :inverse_of => :notifications

  ##
  # Validations
  #
  validates :event_type,
            :presence => true

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
