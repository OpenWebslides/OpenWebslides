# frozen_string_literal: true

##
# Conversion resource
#
class ConversionResource < ApplicationResource
  immutable

  ##
  # Attributes
  #
  attribute :created_at,
            :format => :date

  attribute :name
  attribute :status

  ##
  # Relationships
  #
  has_one :deck
  has_one :user

  ##
  # Filters
  #
  filter :status

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.creatable_fields(_ = {})
    []
  end
end
