# frozen_string_literal: true

##
# A conversation (comment thread starter)
#
class Conversation < Annotation
  ##
  # Properties
  #
  enum :comment_type => %i[question note]

  property :text

  ##
  # Associations
  #
  has_many :comments,
           :dependent => :destroy,
           :inverse_of => :conversation

  ##
  # Validations
  #
  validates :text, :presence => true

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
