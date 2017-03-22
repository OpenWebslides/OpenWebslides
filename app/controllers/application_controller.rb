# frozen_string_literal: true
class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, :if => :devise_controller?
  before_action :skip_session

  def index; end

  protected

  def configure_permitted_parameters
    attributes = [:name, :email]
    devise_parameter_sanitizer.permit(:sign_up, :keys => attributes)
  end

  def skip_session
    request.session_options[:skip] = true
  end
end
