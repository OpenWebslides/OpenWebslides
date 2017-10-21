# frozen_string_literal: true

class FlagController < ApplicationController
  include EventAuthorizable

  # Authentication
  before_action :authenticate_user
  after_action :renew_token

  # Authorization
  after_action :verify_authorized

  ##
  # Resource
  #

  # POST /flag
  def create
    @annotation = params[:comment_id] ? Comment.find(params[:comment_id]) : Conversation.find(params[:conversation_id])

    authorize_event @annotation, :flag

    if @annotation.flag
      jsonapi_render :json => @annotation, :options => { :resource => annotation_resource }
    else
      jsonapi_render_errors :json => @annotation, :status => :unprocessable_entity
    end
  end

  protected

  def annotation_resource
    ApplicationResource.resource_for @annotation.type
  end
end
