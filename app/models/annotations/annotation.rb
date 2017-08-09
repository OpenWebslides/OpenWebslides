# frozen_string_literal: true

module Annotations
  ##
  # Annotation base class
  #
  class Annotation < ApplicationRecord
    ##
    # Properties
    #
    property :content_item_id

    ##
    # Associations
    #
    belongs_to :user,
               :required => true,
               :inverse_of => :annotations

    belongs_to :deck,
               :required => true,
               :inverse_of => :annotations

    ##
    # Validations
    #
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
