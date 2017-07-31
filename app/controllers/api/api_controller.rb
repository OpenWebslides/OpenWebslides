# frozen_string_literal: true

module Api
  ##
  # REST API controller
  #
  class ApiController < ApplicationController
    include JSONAPI::Utils
    include JWT::Auth::Authentication
    include Pundit

    rescue_from Api::ApiError, :with => :api_error
    rescue_from ActiveRecord::RecordNotFound, :with => :jsonapi_render_not_found

    rescue_from JWT::Auth::UnauthorizedError, :with => :user_not_authenticated
    rescue_from Pundit::NotAuthorizedError, :with => :user_not_authorized

    protected

    ##
    # Request context for resources
    #
    def context
      { :current_user => current_user }
    end

    ##
    # Handle generic API errors
    #
    def api_error(error)
      errors = error.errors

      response.headers['Content-Type'] = JSONAPI::MEDIA_TYPE
      render :json => { :errors => errors }, :status => errors.first.status
    end

    ##
    # Handle errors originating from jwt-auth
    #
    def user_not_authenticated
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      action = params[:action]
      error = JSONAPI::Error.new :code => JSONAPI::UNAUTHORIZED,
                                 :status => :unauthorized,
                                 :title => "#{action.capitalize} unauthorized",
                                 :detail => "You don't have permission to #{action} this #{type}."

      response.headers['Content-Type'] = JSONAPI::MEDIA_TYPE
      render :json => { :errors => [error] }, :status => :unauthorized
    end

    ##
    # Handle errors originating from Pundit
    #
    def user_not_authorized
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      action = params[:action]
      error = JSONAPI::Error.new :code => JSONAPI::FORBIDDEN,
                                 :status => :forbidden,
                                 :title => "#{action.capitalize} forbidden",
                                 :detail => "You don't have permission to #{action} this #{type}."

      response.headers['Content-Type'] = JSONAPI::MEDIA_TYPE
      render :json => { :errors => [error] }, :status => :forbidden
    end
  end
end
