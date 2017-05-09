# frozen_string_literal: true

module Api
  class ApiController < ApplicationController
    include JSONAPI::ActsAsResourceController
    include JWT::Auth::Authentication
    include Pundit

    rescue_from Api::ApiError, :with => :api_error

    rescue_from JWT::Auth::UnauthorizedError, :with => :user_not_authenticated
    rescue_from Pundit::NotAuthorizedError, :with => :user_not_authorized

    protected

    def context
      { :current_user => current_user }
    end

    ##
    # Handle generic API errors
    #
    def api_error(error)
      render :json => { :errors => error.errors }, :status => error.errors.first.status
    end

    ##
    # Handle errors originating from jwt-auth
    #
    def user_not_authenticated
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      error = JSONAPI::Error.new :code => JSONAPI::UNAUTHORIZED,
                                 :status => :unauthorized,
                                 :title => "#{params[:action].capitalize} unauthorized",
                                 :detail => "You don't have permission to #{params[:action]} this #{type}."

      render :json => { :errors => [error] }, :status => :unauthorized
    end

    ##
    # Handle errors originating from Pundit
    #
    def user_not_authorized
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      error = JSONAPI::Error.new :code => JSONAPI::FORBIDDEN,
                                 :status => :forbidden,
                                 :title => "#{params[:action].capitalize} forbidden",
                                 :detail => "You don't have permission to #{params[:action]} this #{type}."

      render :json => { :errors => [error] }, :status => :forbidden
    end
  end
end
