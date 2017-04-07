# frozen_string_literal: true

module Api
  class ApiController < ApplicationController
    include JSONAPI::ActsAsResourceController
    include JWT::Auth::Authentication
    include Pundit

    after_action :add_token_to_response

    rescue_from JWT::Auth::UnauthorizedError, :with => :user_not_authenticated
    rescue_from Pundit::NotAuthorizedError, :with => :user_not_authorized

    protected

    def user_not_authenticated(error)
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      error = JSONAPI::Error.new :code => JSONAPI::UNAUTHORIZED,
                                 :status => :unauthorized,
                                 :title => "#{params[:action].capitalize} unauthorized",
                                 :detail => "You don't have permission to #{params[:action]} this #{type}."

      render :json => { :errors => [error] }, :status => 401
    end

    def user_not_authorized(error)
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      error = JSONAPI::Error.new :code => JSONAPI::FORBIDDEN,
                                 :status => :forbidden,
                                 :title => "#{params[:action].capitalize} forbidden",
                                 :detail => "You don't have permission to #{params[:action]} this #{type}."

      render :json => { :errors => [error] }, :status => 403
    end
  end
end
