# frozen_string_literal: true

##
# Conversation resource
#
class ConversationResource < AnnotationResource
  ##
  # Attributes
  #
  attribute :conversation_type
  attribute :title
  attribute :text

  ##
  # Relationships
  #
  has_many :comments

  ##
  # Filters
  #
  filter :conversation_type

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.creatable_fields(context = {})
    super(context) - %i[comments]
  end

  def self.updatable_fields(context = {})
    super(context) - %i[conversation_type comments]
  end
end
