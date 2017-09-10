# frozen_string_literal: true

class CommentsController < ApplicationController
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

  # POST /comments
  def create
    @comment = Comment.new comment_params

    authorize @comment

    if service.create
      jsonapi_render :json => @comment, :status => :created
    else
      jsonapi_render_errors :json => @comment, :status => :unprocessable_entity
    end
  end

  # GET /comments/:id
  def show
    @comment = Comment.find params[:id]

    authorize @comment

    jsonapi_render :json => @comment
  end

  # PATCH /comments/:id
  def update
    @comment = Comment.find params[:id]

    authorize @comment
    # TODO: authorize state change

    if service.update resource_params
      jsonapi_render :json => @comment
    else
      jsonapi_render_errors :json => @comment, :status => :unprocessable_entity
    end
  end

  # DELETE /comments/:id
  def destroy
    @comment = Comment.find params[:id]

    authorize @comment

    service.delete

    head :no_content
  end

  ##
  # Relationships
  #
  # Relationships and related resource actions are implemented in the respective concerns
  #

  protected

  def comment_params
    resource_params.merge :user_id => relationship_params[:user],
                          :deck_id => relationship_params[:deck],
                          :conversation_id => relationship_params[:conversation]
  end

  def service
    @service ||= CommentService.new @comment
  end
end
