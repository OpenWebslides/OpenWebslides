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
  validates_uniqueness_of :user_id, :scope => :annotation_id

  validate :annotation_unlocked

  ##
  # Callbacks
  #
  before_destroy do
    annotation_unlocked

    throw(:abort) if errors.present?
  end

  ##
  # Methods
  #
  ##
  # Overrides
  #
  ##
  # Helpers and callback methods
  #

  ##
  # Validate whether the annotation is not hidden or flagged
  #
  def annotation_unlocked
    errors.add :base, 'annotation (or parent) cannot be hidden or flagged' if annotation.locked?
  end
end
