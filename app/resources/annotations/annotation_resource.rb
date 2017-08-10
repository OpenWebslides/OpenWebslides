# frozen_string_literal: true

module Annotations
  ##
  # Base annotation resource
  #
  class AnnotationResource < ApplicationResource
    model_name 'Annotations::Annotation'

    ##
    # Properties
    #
    attribute :content_item_id

    has_one :user
    has_one :deck

    ##
    # Filters
    #
    filters :user, :content_item_id

    ##
    # Callbacks
    #
    ##
    # Methods
    #
    def self.updatable_fields(context = {})
      super(context) - %i[content_item_id user deck]
    end
  end
end
