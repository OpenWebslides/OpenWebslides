# frozen_string_literal: true

module JSONAPI
  module Exceptions
    class UnsupportedBinaryUploadMediaTypeError < Error
      attr_accessor :media_type

      def initialize(media_type, error_object_overrides = {})
        @media_type = media_type
        super error_object_overrides
      end

      def errors
        types = JSONAPI::ALLOWED_BINARY_MEDIA_TYPES.join(' ')

        params = {
          :code => JSONAPI::UNSUPPORTED_MEDIA_TYPE,
          :status => :unsupported_media_type,
          :title => I18n.translate('jsonapi-resources.exceptions.unsupported_binary_upload_media_type.title',
                                   :default => 'Unsupported media type'),
          :detail => I18n.translate('jsonapi-resources.exceptions.unsupported_binary_upload_media_type.detail',
                                    :default => "All requests that upload must use one of '#{types}' Content-Type. This request specified '#{media_type}'.",
                                    :needed_media_type => types,
                                    :media_type => media_type)
        }

        [create_error_object(params)]
      end
    end
  end
end
