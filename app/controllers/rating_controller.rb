# frozen_string_literal: true

class RatingController < ApplicationController
  # Authentication
  before_action :authenticate_user
  after_action :renew_token

  # Authorization
  after_action :verify_authorized

  prepend_before_action :add_dummy_id

  ##
  # Resource
  #

  # POST /ratings
  def create
    @annotation = params[:comment_id] ? Comment.find(params[:comment_id]) : Conversation.find(params[:conversation_id])

    @rating = Rating.new :user => current_user,
                         :annotation => @annotation

    authorize @rating

    if @rating.save
      jsonapi_render :json => @annotation, :options => { :resource => annotation_resource }
    else
      jsonapi_render_errors :json => @rating, :status => :unprocessable_entity
    end
  end

  # DELETE /ratings/:id
  def destroy
    @annotation = params[:comment_id] ? Comment.find(params[:comment_id]) : Conversation.find(params[:conversation_id])

    @rating = @annotation.ratings.find_by!(:user => current_user)

    authorize @rating

    if @rating.destroy
      jsonapi_render :json => @annotation, :options => { :resource => annotation_resource }
    else
      jsonapi_render_errors :json => @rating, :status => :unprocessable_entity
    end
  end

  protected

  def annotation_resource
    ApplicationResource.resource_for @annotation.type
  end

  def add_dummy_id
    # JSONAPI::Resources requires an :id attribute
    params[:id] = 0
  end

  def rating_params
    resource_params.merge :annotation_id => relationship_params[:annotation],
                          :user_id => relationship_params[:user]
  end
end
