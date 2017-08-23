# frozen_string_literal: true

##
# Annotation rating
#
class RatingResource < ApplicationResource
  ##
  # Attributes
  #
  ##
  # Relationships
  #
  has_one :annotation
  has_one :user

  ##
  # Filters
  #
  ##
  # Callbacks
  #
  ##
  # Methods
  #
end
