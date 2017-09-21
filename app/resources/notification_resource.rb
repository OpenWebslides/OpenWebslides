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
  attribute :object_display_name

  ##
  # Relationships
  #
  has_one :subject,
          :class_name => 'User',
          :always_include_linkage_data => true

  has_one :object,
          :polymorphic => true,
          :always_include_linkage_data => true

  ##
  # Filters
  #
  filter :subject
  filter :object
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
    @model && @model.subject && @model.subject.display_name
  end

  def object_display_name
    @model && @model.object && @model.object.display_name
  end

  def meta(options)
    {
      options[:serializer].key_formatter.format(:created_at) => DateValueFormatter.format(_model.created_at)
    }
  end
end
