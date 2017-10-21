# frozen_string_literal: true

class ApplicationController < ActionController::API
  include JSONAPI::Utils
  include JWT::Auth::Authentication
  include Pundit

  include RelationshipAuthorizable
  include ErrorHandling

  protected

  ##
  # Request context for resources
  #
  def context
    { :current_user => current_user }
  end

  ##
  # API url for link generation
  #
  def base_url
    @base_url ||= "#{request.protocol}#{request.host_with_port}/api"
  end

  ##
  # Attach additional information to exception notifications
  #
  def prepare_exception_notifier
    request.env['exception_notifier.exception_data'] = {
      :current_user => current_user,
      :host => ENV['HOSTNAME']
    }
  end
end
