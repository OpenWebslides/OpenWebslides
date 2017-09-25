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

    conversation_created
    comment_created
  ]

  ##
  # Associations
  #
  belongs_to :subject,
             :class_name => 'User',
             :required => true,
             :inverse_of => :notifications

  belongs_to :item,
             :polymorphic => true,
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
