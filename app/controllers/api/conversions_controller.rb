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

      conversion = Conversion.new :user => current_user

      # Authorize
      raise Pundit::NotAuthorizedError unless ConversionPolicy.new(current_user, conversion).create?
      context[:policy_used]&.call

      # Copy uploaded file to tempfile
      filename = request.headers['HTTP_CONTENT_DISPOSITION'].match(/filename ?= ?"?([^\\"]*)"?/)[1]
      raise Api::ApiError, :detail => 'Invalid Content-Disposition header' unless filename

      file = Rails.root.join 'tmp', 'uploads', "#{SecureRandom.urlsafe_base64}-#{filename}"
      raise OpenWebslides::NotImplementedError unless request.body.is_a?(Tempfile)
      FileUtils.cp request.body.path, file

      # Create and queue conversion
      conversion.filename = file
      conversion.name = filename
      conversion.status = :queued
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
