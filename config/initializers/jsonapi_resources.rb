# frozen_string_literal: true

JSONAPI.configure do |config|
  config.exception_class_whitelist = [Pundit::NotAuthorizedError, JWT::Auth::UnauthorizedError]
  config.default_paginator = :offset
  config.json_key_format = :camelized_key

  # Add missing HTTP status codes
  JSONAPI::UNAUTHORIZED = '401'
  JSONAPI::UNPROCESSABLE_ENTITY = '422'
end

module JSONAPI
  module Errors
    class UnsupportedUploadMediaTypeError < Error
      attr_accessor :media_type

      def initialize(media_type, error_object_overrides = {})
        @media_type = media_type
        super(error_object_overrides)
      end

      def errors
        [create_error_object(code: JSONAPI::UNSUPPORTED_MEDIA_TYPE,
                             status: :unsupported_media_type,
                             title: I18n.translate('jsonapi-resources.exceptions.unsupported_media_type.title',
                                                   default: 'Unsupported media type'),
                             detail: I18n.translate('jsonapi-resources.exceptions.unsupported_upload_media_type.detail',
                                                    default: "All requests that upload must use the '#{JSONAPI::UPLOAD_MEDIA_TYPE}' Content-Type. This request specified '#{media_type}'.",
                                                    needed_media_type: JSONAPI::UPLOAD_MEDIA_TYPE,
                                                    media_type: media_type))]
      end
    end

    class UnsupportedBinaryUploadMediaTypeError < Error
      attr_accessor :media_type

      def initialize(media_type, error_object_overrides = {})
        @media_type = media_type
        super(error_object_overrides)
      end

      def errors
        [create_error_object(code: JSONAPI::UNSUPPORTED_MEDIA_TYPE,
                             status: :unsupported_media_type,
                             title: I18n.translate('jsonapi-resources.exceptions.unsupported_media_type.title',
                                                   default: 'Unsupported media type'),
                             detail: I18n.translate('jsonapi-resources.exceptions.unsupported_binary_upload_media_type.detail',
                                                    default: "All requests that upload must use the '#{JSONAPI::BINARY_UPLOAD_MEDIA_TYPE}' Content-Type. This request specified '#{media_type}'.",
                                                    needed_media_type: JSONAPI::BINARY_UPLOAD_MEDIA_TYPE,
                                                    media_type: media_type))]
      end
    end
  end
end
