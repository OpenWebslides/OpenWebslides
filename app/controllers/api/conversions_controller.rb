# frozen_string_literal: true

require 'securerandom'

module Api
  class ConversionsController < ApiController
    MEDIA_TYPE = 'multipart/form-data'

    before_action :authenticate_user

    after_action :renew_token

    def create
      unless request.content_type == MEDIA_TYPE
        return handle_exceptions JSONAPI::Exceptions::UnsupportedMediaTypeError.new(request.content_type)
      end

      conversion = Conversion.new :user => current_user, :status => :queued

      # Authorize
      raise Pundit::NotAuthorizedError unless ConversionPolicy.new(current_user, conversion).create?
      context[:policy_used]&.call

      # Copy uploaded file to tempfile
      filename = params[:qqfilename]
      raise Api::ApiError, :detail => 'Invalid filename' unless filename

      # Create tempfile with proper extension
      file = Tempfile.new ['', ".#{filename.split('.').last}"]
      file.close
      FileUtils.cp params[:qqfile].path, file.path

      # Create and queue conversion
      conversion.filename = file.path
      conversion.name = filename
      conversion.save

      resource = ConversionResource.resources_for([conversion], context).first

      results = JSONAPI::OperationResults.new
      results.add_result JSONAPI::ResourceOperationResult.new :created, resource

      render_upload_results results
    rescue => e
      render :json => {
        :success => false,
        :error => e.message,
        :preventRetry => true
      }
    end

    private

    def render_upload_results(operation_results)
      # Adapted from ActsAsResourceController#render_results

      response_doc = create_response_document(operation_results)
      content = response_doc.contents

      render_options = {}
      if operation_results.has_errors?
        render_options[:json] = content
      else
        # Bypasing ActiveSupport allows us to use CompiledJson objects for cached response fragments
        render_options[:body] = JSON.generate(content.merge :success => true)
      end

      render_options[:location] = content[:data]["links"][:self] if (
      response_doc.status == :created && content[:data].class != Array
      )

      # For whatever reason, `render` ignores :status and :content_type when :body is set.
      # But, we can just set those values directly in the Response object instead.
      response.status = response_doc.status
      response.headers['Content-Type'] = JSONAPI::MEDIA_TYPE

      render(render_options)
    end
  end
end
