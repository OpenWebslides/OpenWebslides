# frozen_string_literal: true

##
# Conversion resource
#
class ConversionResource < ApplicationResource
  immutable

  ##
  # Attributes
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

  def self.sortable_fields(context = {})
    super(context) + %i[created_at]
  end

  def meta(options)
    {
      options[:serializer].key_formatter.format(:created_at) => DateValueFormatter.format(_model.created_at)
    }
  end
end
