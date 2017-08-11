# frozen_string_literal: true

module Annotations
  class Rating < ApplicationRecord
    ##
    # Properties
    #
    ##
    # Associations
    #
    belongs_to :annotation,
               :required => true,
               :class_name => 'Annotations::Annotation',
               :inverse_of => :ratings

    belongs_to :user,
               :required => true,
               :inverse_of => :ratings

    ##
    # Validations
    #
    validates_uniqueness_of :annotation_id, :scope => :user_id

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
