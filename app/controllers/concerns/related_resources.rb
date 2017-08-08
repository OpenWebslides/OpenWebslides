# frozen_string_literal: true

##
# Wrap related resource actions to provide authorization
#
module RelatedResources
  extend ActiveSupport::Concern

  # GET /klass/:klass_id/:relationship (e.g. /decks/:deck_id/owner)
  def get_related_resource
    model_klass = params[:source].classify.constantize

    id = params["#{params[:source].singularize}_id"]
    @resource = model_klass.find id
    @relationship = @resource.send params[:relationship]

    # Authorize RELATIONSHIP_CLASS#show_RELATIONSHIP? (e.g. DeckPolicy#show_owner?)
    authorize @resource, "show_#{params[:relationship]}?"

    # Authorize INVERSE_RELATIONSHIP_CLASS#show? (e.g. UserPolicy#show?)
    authorize @relationship, :show?

    jsonapi_render :json => @relationship
  end

  # GET /klass/:klass_id/:relationship (e.g. /users/:user_id/decks)
  def get_related_resources
    model_klass = params[:source].classify.constantize

    id = params["#{params[:source].singularize}_id"]
    @resource = model_klass.find id

    # Authorize MODEL#show_RELATIONSHIP? (e.g. UserPolicy#show_decks?)
    authorize @resource, "show_#{params[:relationship]}?"

    # Authorize INVERSE_RELATIONSHIP_CLASS::Policy (e.g. DeckPolicy::Scope)
    @resources = policy_scope @resource.send params[:relationship]

    jsonapi_render :json => @resources
  end
end
