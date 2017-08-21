# frozen_string_literal: true

##
# Base annotation resource
#
class AnnotationResource < ApplicationResource
  ##
  # Properties
  #
  attribute :content_item_id

  has_one :user
  has_one :deck

  ##
  # Filters
  #
  filters :user, :content_item_id

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.updatable_fields(context = {})
    super(context) - %i[content_item_id user deck]
  end

  def meta(options)
    {
      options[:serializer].key_formatter.format(:created_at) => DateValueFormatter.format(_model.created_at)
    }
  end
end
