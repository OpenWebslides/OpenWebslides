# frozen_string_literal: true

class AnnotationsController < ApplicationController
  include Relationships
  include RelatedResources

  # Authentication
  before_action :authenticate_user, :only => %i[create update destroy]
  after_action :renew_token

  # Authorization
  after_action :verify_authorized, :except => %i[show_relationship get_related_resources]
  after_action :verify_policy_scoped, :only => %i[get_related_resources]
  after_action :verify_authorized_or_policy_scoped, :only => :show_relationship

  ##
  # Resource
  #

  # POST /annotations
  def create
    @resource = model_klass.new annotation_params

    authorize @resource

    if service.create
      jsonapi_render :json => @resource, :status => :created
    else
      jsonapi_render_errors :json => @resource, :status => :unprocessable_entity
    end
  end

  # GET /annotations/:id
  def show
    @resource = model_klass.find params[:id]

    authorize @resource

    jsonapi_render :json => @resource
  end

  # PATCH /annotations/:id
  def update
    @resource = model_klass.find params[:id]

    authorize @resource

    if service.update resource_params
      jsonapi_render :json => @resource
    else
      jsonapi_render_errors :json => @resource, :status => :unprocessable_entity
    end
  end

  # DELETE /annotations/:id
  def destroy
    @resource = model_klass.find params[:id]

    authorize @resource

    service.delete

    head :no_content
  end

  ##
  # Relationships
  #
  # Relationships and related resource actions are implemented in the respective concerns
  #

  protected

  def model_klass
    controller_path.classify.constantize
  end

  def annotation_params
    resource_params.merge :user_id => relationship_params[:user],
                          :deck_id => relationship_params[:deck],
                          :conversation_id => relationship_params[:conversation]
  end

  def service
    service_klass = "#{resource_klass._model_name}Service".constantize
    @service ||= service_klass.new @resource
  end
end
