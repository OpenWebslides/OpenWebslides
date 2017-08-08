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
    model_klass = controller_name.classify.constantize
    inverse_name = model_klass.reflect_on_association(params[:relationship]).inverse_of.name.to_s
    query = params[:action].gsub('relationship', inverse_name) + '?'
    authorize record, query
  end

  ##
  # Raises an error if authorization has not been performed, either through a policy or a policy scope
  #
  # Use this as an after_action on `show_relationship`, because either a policy or a policy scope
  # gets authorized in that method, based on the relationship plurality
  #
  def verify_authorized_or_policy_scoped
    raise AuthorizationNotPerformedError, self.class unless pundit_policy_authorized? || pundit_policy_scoped?
  end
end
