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
    # Annotation is locked
    locked = annotation.hidden? || annotation.flagged?

    # Parent conversation is locked
    convo_locked = annotation.is_a?(Comment) && (annotation.conversation.hidden? || annotation.conversation.flagged?)

    return unless locked || convo_locked

    errors.add :base, 'annotation cannot be hidden or flagged'
  end
end
