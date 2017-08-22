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

  # State
  attribute :state

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
    super(context) - %i[rating rated state]
  end

  def self.updatable_fields(context = {})
    super(context) - %i[content_item_id user deck rating rated state]
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

  # Map state name to API state name
  def state
    {
      :created => nil,
      :edited => 'edited',
      :flagged => 'flagged',
      :secret => 'private',
      :hidden => 'deleted'
    }[_model.state_name]
  end
end
