# frozen_string_literal: true

module Api
  class ApiController < ApplicationController
    include JSONAPI::ActsAsResourceController
    include JWT::Auth::Authentication
    include Pundit

    after_action :add_token_to_response

    rescue_from JWT::Auth::UnauthorizedError, :with => :user_not_authenticated
    rescue_from Pundit::NotAuthorizedError, :with => :user_not_authorized
    rescue_from Api::DeviseError, :with => :devise_error

    protected

    def context
      { :current_user => current_user }
    end

    def user_not_authenticated
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      error = JSONAPI::Error.new :code => JSONAPI::UNAUTHORIZED,
                                 :status => :unauthorized,
                                 :title => "#{params[:action].capitalize} unauthorized",
                                 :detail => "You don't have permission to #{params[:action]} this #{type}."

      render :json => { :errors => [error] }, :status => :unauthorized
    end

    def user_not_authorized
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      error = JSONAPI::Error.new :code => JSONAPI::FORBIDDEN,
                                 :status => :forbidden,
                                 :title => "#{params[:action].capitalize} forbidden",
                                 :detail => "You don't have permission to #{params[:action]} this #{type}."

      render :json => { :errors => [error] }, :status => :forbidden
    end

    def devise_error(error)
      render :json => { :errors => error.errors }, :status => error.errors.first.status
    end
  end
end
