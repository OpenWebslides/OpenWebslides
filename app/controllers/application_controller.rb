# frozen_string_literal: true

class ApplicationController < ActionController::API
  include JSONAPI::Utils
  include JWT::Auth::Authentication
  include Pundit

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
  # Use Pundit authorize a relationship action
  #
  def authorize_relationship(record)
    query = params[:action].gsub('relationship', params[:relationship]) + '?'
    authorize record, query
  end

  ##
  # Use Pundit to authorize an inverse relationship action
  #
  def authorize_inverse_relationship(record)
    # Lookup the inverse association name
    inverse_name = resource_klass._model_class.reflect_on_association(params[:relationship]).inverse_of.name.to_s
    query = params[:action].gsub('relationship', inverse_name) + '?'
    authorize record, query
  end
end
