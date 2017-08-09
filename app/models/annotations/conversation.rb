# frozen_string_literal: true

module Annotations
  ##
  # Conversation (comment thread starter)
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
end
