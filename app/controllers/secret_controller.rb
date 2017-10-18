# frozen_string_literal: true

class SecretController < ApplicationController
  # Authentication
  before_action :authenticate_user
  after_action :renew_token

  # Authorization
  after_action :verify_authorized

  prepend_before_action :add_dummy_id

  ##
  # Resource
  #

  # POST /secret
  def create
    @annotation = Conversation.find params[:conversation_id]

    authorize @annotation, :fsm_protect?

    if @annotation.protect
      jsonapi_render :json => @annotation, :options => { :resource => ConversationResource }
    else
      jsonapi_render_errors :json => @annotation, :status => :unprocessable_entity
    end
  end

  # DELETE /secret
  def destroy
    @annotation = Conversation.find params[:conversation_id]

    authorize @annotation, :fsm_publish?

    if @annotation.publish
      jsonapi_render :json => @annotation, :options => { :resource => ConversationResource }
    else
      jsonapi_render_errors :json => @annotation, :status => :unprocessable_entity
    end
  end

  protected

  def add_dummy_id
    # JSONAPI::Resources requires an :id attribute
    params[:id] = 0
  end
end
