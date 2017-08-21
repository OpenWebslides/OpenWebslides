# frozen_string_literal: true

class NotificationResource < ApplicationResource
  immutable

  ##
  # Properties
  #
  attribute :event_type, :format => :uppercase
  attributes :user_name, :deck_name

  has_one :user, :always_include_linkage_data => true
  has_one :deck, :always_include_linkage_data => true

  ##
  # Filters
  #
  filters :user, :deck
  filter :event_type, :verify => ->(values, _) { values.map(&:downcase) & Notification.event_types.keys }

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.sortable_fields(_)
    [:created_at]
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
