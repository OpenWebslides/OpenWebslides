# frozen_string_literal: true

##
# Notification feed resource
#
class NotificationResource < ApplicationResource
  immutable

  ##
  # Attributes
  #
  attribute :predicate

  attribute :subject_display_name
  attribute :item_display_name
  attribute :deck_display_name

  ##
  # Relationships
  #
  has_one :subject,
          :class_name => 'User',
          :always_include_linkage_data => true

  has_one :item,
          :polymorphic => true,
          :always_include_linkage_data => true

  has_one :deck,
          :always_include_linkage_data => true

  ##
  # Filters
  #
  filter :subject
  filter :deck
  filter :predicate,
         :verify => ->(values, _) { values.map(&:downcase) & Notification.predicates.keys }

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

  def subject_display_name
    @model.subject.display_name
  end

  def deck_display_name
    @model.deck.display_name
  end

  def item_display_name
    @model && @model.item && @model.item.display_name
  end

  def meta(options)
    {
      options[:serializer].key_formatter.format(:created_at) => DateValueFormatter.format(_model.created_at)
    }
  end
end
