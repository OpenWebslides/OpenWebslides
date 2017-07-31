# frozen_string_literal: true

module Api
  include Rails.application.routes.url_helpers

  ##
  # A binary asset (image, video, ...)
  #
  class AssetResource < ApiResource
    immutable

    ##
    # Properties
    #
    attributes :filename

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
      token = AssetToken.new :subject => context[:current_user], :object => @model

      url = "#{options[:serializer].link_builder.self_link(self)}/raw?token=#{token.to_jwt}"
      { :raw => url }
    end
  end
end
