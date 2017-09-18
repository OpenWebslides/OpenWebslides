# frozen_string_literal: true

##
# A notification for the social feed
#
class Notification < ApplicationRecord
  ##
  # Properties
  #
  enum :predicate => %i[
    deck_created
    deck_updated
  ]

  ##
  # Associations
  #
  belongs_to :subject,
             :class_name => 'User',
             :required => true,
             :inverse_of => :notifications

  belongs_to :object,
             :class_name => 'Deck',
             :required => true,
             :inverse_of => :notifications

  ##
  # Validations
  #
  validates :predicate,
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
