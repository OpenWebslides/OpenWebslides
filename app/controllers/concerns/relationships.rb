# frozen_string_literal: true

##
# Wrap relationship actions to provide authorization
#
module Relationships
  extend ActiveSupport::Concern

  # GET /klass/:klass_id/relationships/:relationship
  def show_relationship
    model_klass = controller_name.classify.constantize
    @resource = model_klass.find params["#{controller_name.singularize}_id"]

    # Authorize MODEL#show_RELATIONSHIP? (e.g. UserPolicy#show_collaborations?)
    authorize_relationship @resource

    # Authorize RELATIONSHIP_CLASS#show_INVERSE_RELATIONSHIP? (e.g. DeckPolicy#show_collaborators?)
    policy_scope(@resource.send params[:relationship]).each { |resource| authorize_inverse_relationship resource }

    super
  end

  # POST /klass/:klass_id/relationships/:relationship
  def create_relationship
    handle_relationship_update
  end

  # PATCH /klass/:klass_id/relationships/:relationship
  def update_relationship
    handle_relationship_update
  end

  # DELETE /klass/:klass_id/relationships/:relationship
  def destroy_relationship
    handle_relationship_update
  end

  protected

  ##
  # Handle relationship update authorization
  #
  def handle_relationship_update
    model_klass = controller_name.classify.constantize
    @resource = model_klass.find params["#{controller_name.singularize}_id"]

    # Authorize MODEL#destroy_RELATIONSHIP? (e.g. UserPolicy#destroy_collaborations?)
    authorize_relationship @resource

    relationship_klass = model_klass.reflect_on_association(params[:relationship]).klass

    # Authorize RELATIONSHIP_CLASS#destroy_INVERSE_RELATIONSHIP? (e.g. DeckPolicy#destroy_collaborators?)
    # FIXME: does not support polymorphic relationships (`type` is ignored)
    params[:data].pluck(:id).each do |id|
      resource = relationship_klass.find id

      authorize_inverse_relationship resource
    end

    super
  end
end
