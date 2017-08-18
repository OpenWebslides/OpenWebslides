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

  ##
  # Validate whether the record has the same deck and content_item_id as its parent conversation
  #
  def conversation_scope
    return if conversation && deck == conversation.deck && content_item_id == conversation.content_item_id

    errors.add(:base, 'deck and content_item_id must be equal to the parent conversation')
  end
end
