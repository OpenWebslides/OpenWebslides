# frozen_string_literal: true

module Api
  class ConversionsController < ApiController
    # Authentication
    before_action :authenticate_user
    after_action :renew_token

    # Authorization
    after_action :verify_authorized

    skip_before_action :jsonapi_request_handling, :only => :create

    # POST /conversions
    def create
      # FIXME: implement global method to separate requests based on media type
      unless request.content_type == JSONAPI::UPLOAD_MEDIA_TYPE
        raise JSONAPI::Exceptions::UnsupportedUploadMediaTypeError, request.content_type
      end

      @conversion = Conversion.new :user => current_user

      authorize @conversion

      # Copy uploaded file to tempfile
      # TODO: sanitize filenames
      raise Api::ApiError, error_params(:detail => 'Invalid filename') unless params[:qqfilename]
      filename = params[:qqfilename]

      # Create tempfile with proper extension
      raise Api::ApiError, error_params(:detail => 'Invalid file') unless params[:qqfile]
      file = Tempfile.new ['', ".#{filename.split('.').last}"]
      file.close
      FileUtils.cp params[:qqfile].path, file.path

      # Create and queue conversion
      @conversion.status = :queued
      @conversion.filename = file.path
      @conversion.name = filename
      @conversion.save

      # Render results
      setup_request
      jsonapi_render_upload :json => @conversion, :status => :created
    rescue => e
      jsonapi_render_upload_errors e, :json => @conversion, :status => :unprocessable_entity
    end

    # GET /conversions/:id
    def show
      @conversion = Conversion.find params[:id]

      authorize @conversion

      jsonapi_render :json => @conversion
    end

    protected

    def jsonapi_render_upload(json:, status: nil, options: {})
      # Adapted from JSONAPI::Utils::Response::Renders::jsonapi_render

      body = jsonapi_format(json, options)
      render json: body, status: status || @_response_document.status, success: true # This line changed
    rescue => e
      handle_exceptions(e)
    ensure
      correct_media_type
    end

    def jsonapi_render_upload_errors(exception = nil, json: nil, status: nil)
      # Adapted from JSONAPI::Utils::Response::Renders::jsonapi_render_errors

      body   = jsonapi_format_errors(exception || json)
      status = status || body.try(:first).try(:[], :status)
      render json: { errors: body, error: exception.params[:detail] }, status: status, success: false # This line changed
    ensure
      correct_media_type
    end

    def error_params(message)
      {
        :title => message,
        :detail => message,
        :status => :unprocessable_entity,
        :code => JSONAPI::PARAM_MISSING
      }
    end
  end
end
