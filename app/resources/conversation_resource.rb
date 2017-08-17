# frozen_string_literal: true

##
# Conversation resource
#
class ConversationResource < AnnotationResource
  ##
  # Properties
  #
  attributes :comment_type, :text

  has_many :comments

  ##
  # Filters
  #
  filters :comment_type

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
    super(context) - %i[comment_type text comments]
  end
end
