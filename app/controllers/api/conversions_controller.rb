# frozen_string_literal: true

require 'securerandom'

module Api
  class ConversionsController < ApiController
    MEDIA_TYPE = 'application/octet-stream'

    before_action :authenticate_user

    after_action :renew_token

    def create
      unless request.content_type == MEDIA_TYPE
        return handle_exceptions JSONAPI::Exceptions::UnsupportedMediaTypeError.new(request.content_type)
      end

      return unless verify_accept_header

      raise Api::ApiError, :detail => 'No Content-Disposition header' unless request.headers['HTTP_CONTENT_DISPOSITION']

      conversion = Conversion.new :user => current_user, :status => :queued

      # Authorize
      raise Pundit::NotAuthorizedError unless ConversionPolicy.new(current_user, conversion).create?
      context[:policy_used]&.call

      # Copy uploaded file to tempfile
      filename = request.headers['HTTP_CONTENT_DISPOSITION'].match(/filename ?= ?"?([^\\"]*)"?/)[1]
      raise Api::ApiError, :detail => 'Invalid Content-Disposition header' unless filename

      # Create tempfile with proper extension
      file = Tempfile.new ['', ".#{filename.split('.').last}"]
      file.binmode
      file.write request.body.read
      file.close

      # Create and queue conversion
      conversion.filename = file.path
      conversion.name = filename
      conversion.save

      resource = ConversionResource.resources_for([conversion], context).first

      results = JSONAPI::OperationResults.new
      results.add_result JSONAPI::ResourceOperationResult.new :created, resource

      render_results results
    rescue Api::ApiError => e
      e.params[:code] = JSONAPI::UNPROCESSABLE_ENTITY
      e.params[:status] = :unprocessable_entity
      e.params[:title] = 'Unprocessable entity'

      raise e
    end
  end
end
