# frozen_string_literal: true
module Api
  class ApiController < ApplicationController
    include DeviseTokenAuth::Concerns::SetUserByToken
    include Pundit

    before_action :ensure_json_request
    after_action :verify_authorized, :except => :index
    after_action :verify_policy_scoped, :only => :index

    rescue_from Exception, :with => :handle_error

    def respond_with_errors(object)
      @errors = ErrorSerializer.serialize_object object
      render :errors, :status => :unprocessable_entity
    end

    private

    def ensure_json_request
      return if request.format == :json
      head :not_acceptable
    end

    def handle_error(exception)
      Rails.logger.error exception

      @errors = ErrorSerializer.serialize_exception exception

      raise exception
    rescue Pundit::NotAuthorizedError
      head :not_authorized
    rescue ActiveRecord::RecordNotFound
      render :errors, :status => :not_found
    rescue
      render :errors, :status => :internal_server_error
    end

    def pundit_user
      current_api_user
    end
  end
end
