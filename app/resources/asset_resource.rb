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

  key_type :string

  ##
  # Relationships
  #
  has_one :deck

  ##
  # Filters
  #
  filter :filename

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.updatable_fields(_ = {})
    []
  end
end
