# frozen_string_literal: true

##
# A user's rating (approval) on an annotation
#
class Rating < ApplicationRecord
  ##
  # Properties
  #
  ##
  # Associations
  #
  belongs_to :annotation,
             :required => true,
             :inverse_of => :ratings

  belongs_to :user,
             :required => true,
             :inverse_of => :ratings

  ##
  # Validations
  #
  validates_uniqueness_of :annotation_id, :scope => :user_id

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
