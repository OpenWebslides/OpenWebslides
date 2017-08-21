# frozen_string_literal: true

##
# Comment resource
#
class CommentResource < AnnotationResource
  ##
  # Attributes
  #
  attribute :text

  ##
  # Relationships
  #
  has_one :conversation

  ##
  # Filters
  #
  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.updatable_fields(context = {})
    super(context) - %i[conversation]
  end
end
