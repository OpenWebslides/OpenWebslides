# frozen_string_literal: true

module ErrorHandling
  extend ActiveSupport::Concern

  included do
    rescue_from JSONAPI::Exceptions::Error, :with => :jsonapi_render_errors
    rescue_from ActiveRecord::RecordNotFound, :with => :jsonapi_render_not_found

    rescue_from JWT::Auth::UnauthorizedError, :with => :user_not_authenticated
    rescue_from Pundit::NotAuthorizedError, :with => :user_not_authorized

    rescue_from OpenWebslides::Error, :with => :jsonapi_render_ows_error
  end

  ##
  # Handle errors originating from jwt-auth
  #
  def user_not_authenticated
    type = self.class.name.demodulize.underscore.split('_').first.singularize
    jsonapi_render_errors JSONAPI::Exceptions::UnauthorizedError.new params[:action], type
  end

  ##
  # Handle errors originating from Pundit
  #
  def user_not_authorized
    type = self.class.name.demodulize.underscore.split('_').first.singularize
    jsonapi_render_errors JSONAPI::Exceptions::UnauthorizedError.new params[:action],
                                                                     type,
                                                                     :status => :forbidden,
                                                                     :code => JSONAPI::FORBIDDEN
  end

  ##
  # Handle errors originating from OWS app code
  #
  def jsonapi_render_ows_error(exception)
    body = {
      :title => exception.title,
      :detail => exception.detail,
      :code => exception.code,
      :status => 422
    }
    render :json => { :errors => [body] }, :status => :unprocessable_entity
  ensure
    correct_media_type
  end
end
