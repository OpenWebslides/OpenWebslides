# frozen_string_literal: true

class ConversationsController < ApplicationController
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

  # POST /conversations
  def create
    @conversation = Conversation.new conversation_params

    authorize @conversation

    if service.create
      jsonapi_render :json => @conversation, :status => :created
    else
      jsonapi_render_errors :json => @conversation, :status => :unprocessable_entity
    end
  end

  # GET /conversations/:id
  def show
    @conversation = Conversation.find params[:id]

    authorize @conversation

    jsonapi_render :json => @conversation
  end

  # PATCH /conversations/:id
  def update
    @conversation = Conversation.find params[:id]

    authorize @conversation
    # TODO: authorize state changes

    if service.update resource_params
      jsonapi_render :json => @conversation
    else
      jsonapi_render_errors :json => @conversation, :status => :unprocessable_entity
    end
  end

  # DELETE /conversations/:id
  def destroy
    @conversation = Conversation.find params[:id]

    authorize @conversation

    service.delete

    head :no_content
  end

  ##
  # Relationships
  #
  # Relationships and related resource actions are implemented in the respective concerns
  #

  protected

  def conversation_params
    resource_params.merge :user_id => relationship_params[:user],
                          :deck_id => relationship_params[:deck]
  end

  def service
    @service ||= ConversationService.new @conversation
  end
end
