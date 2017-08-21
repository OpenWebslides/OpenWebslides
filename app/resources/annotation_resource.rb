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
  attribute :rated

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
  filter :rated

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.creatable_fields(context = {})
    super(context) - %i[rating rated]
  end

  def self.updatable_fields(context = {})
    super(context) - %i[content_item_id user deck rating rated]
  end

  def meta(options)
    {
      options[:serializer].key_formatter.format(:created_at) => DateValueFormatter.format(_model.created_at)
    }
  end

  def rating
    _model.ratings.count
  end

  def rated
    _model.ratings.where(:user => context[:current_user]).any?
  end
end
