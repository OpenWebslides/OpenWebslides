# frozen_string_literal: true

##
# Conversation resource
#
class ConversationResource < AnnotationResource
  ##
  # Properties
  #
  attributes :conversation_type, :title, :text

  has_many :comments

  ##
  # Filters
  #
  filters :conversation_type

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
