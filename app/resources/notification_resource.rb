# frozen_string_literal: true

##
# Notification feed resource
#
class NotificationResource < ApplicationResource
  immutable

  ##
  # Attributes
  #
  attribute :event_type
  attribute :user_name
  attribute :deck_name

  ##
  # Relationships
  #
  has_one :user,
          :always_include_linkage_data => true

  has_one :deck,
          :always_include_linkage_data => true

  ##
  # Filters
  #
  filter :user
  filter :deck
  filter :event_type,
         :verify => ->(values, _) { values.map(&:downcase) & Notification.event_types.keys }

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.sortable_fields(_)
    %i[created_at]
  end

  def self.default_sort
    [{ :field => 'created_at', :direction => :desc }]
  end

  def user_name
    @model.user.name
  end

  def deck_name
    @model.deck.name
  end

  def meta(options)
    {
      options[:serializer].key_formatter.format(:created_at) => DateValueFormatter.format(_model.created_at)
    }
  end
end
