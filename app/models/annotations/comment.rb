# frozen_string_literal: true

module Annotations
  ##
  # Comment
  #
  class Comment < Annotation
    ##
    # Properties
    #
    property :text

    ##
    # Associations
    #
    belongs_to :conversation,
               :inverse_of => :comments

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
