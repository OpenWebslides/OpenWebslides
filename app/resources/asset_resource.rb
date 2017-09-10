# frozen_string_literal: true

##
# A binary asset (image, video, ...)
#
class AssetResource < ApplicationResource
  include Rails.application.routes.url_helpers

  immutable

  ##
  # Attributes
  #
  attribute :filename

  ##
  # Relationships
  #
  has_one :deck

  ##
  # Filters
  #
  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.updatable_fields(_ = {})
    []
  end

  def custom_links(options)
    return unless context[:current_user]
    token = AssetToken.new
    token.subject = context[:current_user]
    token.object = @model

    url = "#{options[:serializer].link_builder.self_link(self)}/raw?token=#{token.to_jwt}"
    { :raw => url }
  end
end
