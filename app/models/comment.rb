# frozen_string_literal: true

##
# A comment on a conversation
#
class Comment < Annotation
  ##
  # Properties
  #
  attribute :text

  ##
  # Associations
  #
  belongs_to :conversation,
             :required => true,
             :inverse_of => :comments

  ##
  # Validations
  #
  validates :text, :presence => true

  validate :conversation_scope
  validate :conversation_unlocked

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def locked?
    super || conversation.locked?
  end

  ##
  # Overrides
  #
  ##
  # Helpers and callback methods
  #

  ##
  # Validate whether the record has the same deck and content_item_id as its parent conversation
  #
  def conversation_scope
    return if conversation && deck == conversation.deck && content_item_id == conversation.content_item_id

    errors.add :base, 'deck and content_item_id must be equal to the parent conversation'
  end

  ##
  # Validate whether the record's parent conversation is not hidden or flagged
  #
  def conversation_unlocked
    return unless conversation.hidden? || conversation.flagged?

    errors.add :base, 'parent conversation cannot be hidden or flagged'
  end
end
