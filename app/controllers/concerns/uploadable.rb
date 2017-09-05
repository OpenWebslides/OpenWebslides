# frozen_string_literal: true

##
# Allows defining controller actions that accept multipart-encoded upload data
# See `config/initializers/jsonapi_resources.rb`, `config/initializers/mime_types.rb`
#
module Uploadable
  extend ActiveSupport::Concern

  included do
    attr_accessor :uploaded_file, :uploaded_filename
  end

  ##
  # Define upload request parameters
  #
  def before_upload_action
    # Ensure media type is 'multipart/form-data'
    ensure_media_type

    # Copy uploaded file to tempfile
    # TODO: sanitize filenames
    raise JSONAPI::Exceptions::BadRequest, 'Invalid filename' unless params[:qqfilename]
    @uploaded_filename = params[:qqfilename]

    # Create tempfile with proper extension
    raise JSONAPI::Exceptions::BadRequest, 'Invalid file' unless params[:qqfile]
    @uploaded_file = params[:qqfile]
  rescue => e
    if @resource
      jsonapi_render_upload_errors e, :json => @resource
    else
      jsonapi_render_upload_errors e
    end
  end

  def ensure_media_type
    unless request.content_type == JSONAPI::UPLOAD_MEDIA_TYPE
      raise JSONAPI::Exceptions::UnsupportedUploadMediaTypeError.new request.content_type
    end
  end

  # Adapted from JSONAPI::Utils::Response::Renders::jsonapi_render
  def jsonapi_render_upload(json:, status: nil, options: {})
    setup_request # This line changed
    body = jsonapi_format(json, options).merge success: true # This line changed
    render json: body, status: status || @_response_document.status
  rescue => e
    jsonapi_render_upload_errors(e) # This line changed
  ensure
    correct_media_type
  end

  # Adapted from JSONAPI::Utils::Response::Renders::jsonapi_render_errors
  def jsonapi_render_upload_errors(exception = nil, json: nil, status: nil)
    setup_request # This line changed
    body   = jsonapi_format_errors(exception || json)
    status = status || body.try(:first).try(:[], :status)
    render json: { errors: body, success: false, preventRetry: true }, status: status # This line changed
  ensure
    correct_media_type
  end

  module ClassMethods
    ##
    # Define an upload action
    #
    def upload_action(*method_syms)
      method_syms.each do |method_sym|
        # Skip JSONAPI checking
        skip_before_action :jsonapi_request_handling, :only => method_sym

        before_action :before_upload_action, :only => method_sym
      end
    end
  end
end
