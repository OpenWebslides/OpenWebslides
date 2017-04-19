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

    def context
      { :current_user => token&.subject }
    end

    def user_not_authenticated
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      render_error JSONAPI::UNAUTHORIZED,
                   :unauthorized,
                   "#{params[:action].capitalize} unauthorized",
                   "You don't have permission to #{params[:action]} this #{type}."
    end

    def user_not_authorized
      type = self.class.name.demodulize.underscore.split('_').first.singularize
      render_error JSONAPI::FORBIDDEN,
                   :forbidden,
                   "#{params[:action].capitalize} forbidden",
                   "You don't have permission to #{params[:action]} this #{type}."
    end

    def render_error(code, status, title, detail)
      error = JSONAPI::Error.new :code => code,
                                 :status => status,
                                 :title => title,
                                 :detail => detail

      render :json => { :errors => [error] }, :status => status
    end
  end
end
