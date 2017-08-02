# frozen_string_literal: true

##
# A conversion job
#
class ConversionResource < ApplicationResource
  immutable

  ##
  # Properties
  #
  attribute :created_at, :format => :date
  attributes :name, :status

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
