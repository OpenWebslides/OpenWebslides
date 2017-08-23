# frozen_string_literal: true

##
# A conversion job
#
class ConversionResource < ApplicationResource
  immutable

  ##
  # Properties
  #
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

  def meta(options)
    {
      options[:serializer].key_formatter.format(:created_at) => DateValueFormatter.format(_model.created_at)
    }
  end
end
