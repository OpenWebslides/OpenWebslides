# frozen_string_literal: true
class ApplicationController < ActionController::API
  before_action :skip_session

  def index; end

  protected

  def skip_session
    request.session_options[:skip] = true
  end
end
