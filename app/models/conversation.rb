# frozen_string_literal: true

##
# A conversation (comment thread starter)
#
class Conversation < Annotation
  ##
  # Properties
  #
  enum :conversation_type => %i[question note]

  property :title
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
  validates :title, :presence => true
  validates :text, :presence => true

  validates :conversation_type, :presence => true

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
