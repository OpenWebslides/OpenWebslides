# frozen_string_literal: true

##
# Base annotation resource
#
class AnnotationResource < ApplicationResource
  ##
  # Attributes
  #
  attribute :content_item_id
  attribute :rating

  ##
  # Relationships
  #
  has_one :user
  has_one :deck

  ##
  # Filters
  #
  filter :user
  filter :content_item_id

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.creatable_fields(context = {})
    super(context) - %i[rating]
  end

  def self.updatable_fields(context = {})
    super(context) - %i[content_item_id user deck rating]
  end

  def meta(options)
    {
      options[:serializer].key_formatter.format(:created_at) => DateValueFormatter.format(_model.created_at)
    }
  end

  def rating
    _model.ratings.count
  end
end
