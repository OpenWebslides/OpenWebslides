# frozen_string_literal: true

module JSONAPI
  module Exceptions
    class UnsupportedUploadMediaTypeError < Error
      attr_accessor :media_type

      def initialize(media_type, error_object_overrides = {})
        @media_type = media_type
        super error_object_overrides
      end

      def errors
        params = {
          :code => JSONAPI::UNSUPPORTED_MEDIA_TYPE,
          :status => :unsupported_media_type,
          :title => I18n.translate('jsonapi-resources.exceptions.unsupported_upload_media_type.title',
                                   :default => 'Unsupported media type'),
          :detail => I18n.translate('jsonapi-resources.exceptions.unsupported_upload_media_type.detail',
                                    :default => "All requests that upload must use the '#{JSONAPI::UPLOAD_MEDIA_TYPE}' Content-Type. This request specified '#{media_type}'.",
                                    :needed_media_type => JSONAPI::UPLOAD_MEDIA_TYPE,
                                    :media_type => media_type)
        }

        [create_error_object(params)]
      end
    end
  end
end
