# frozen_string_literal: true

class UsersController < ApplicationController
  # Authentication
  before_action :authenticate_user, :only => %i[update destroy]
  after_action :renew_token, :except => :destroy

  # Authorization
  after_action :verify_authorized, :except => %i[index show_relationship]
  after_action :verify_policy_scoped, :only => %i[index show_relationship]

  ##
  # Resource
  #

  # GET /users
  def index
    @users = policy_scope User

    jsonapi_render :json => @users
  end

  # POST /users
  def create
    @user = User.new resource_params

    authorize @user

    if @user.save
      jsonapi_render :json => @user, :status => :created
    else
      jsonapi_render_errors :json => @user, :status => :unprocessable_entity
    end
  end

  # GET /users/:id
  def show
    @user = User.find params[:id]

    authorize @user

    jsonapi_render :json => @user
  end

  # PUT/PATCH /users/:id
  def update
    @user = User.find params[:id]

    authorize @user

    if @user.update resource_params
      jsonapi_render :json => @user
    else
      jsonapi_render_errors :json => @user, :status => :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    @user = User.find params[:id]

    authorize @user

    @user.destroy

    head :no_content
  end

  ##
  # Relationships
  #

  # GET /users/:user_id/relationships/:relationship
  def show_relationship
    @user = User.find params[:user_id]

    # Authorize User#show_RELATIONSHIP?
    authorize_relationship @user

    # Authorize RELATIONSHIP_CLASS#show_INVERSE_RELATIONSHIP?
    policy_scope(@user.send params[:relationship]).each { |resource| authorize_inverse_relationship resource }

    super
  end

  # POST /users/:user_id/relationships/:relationship
  def create_relationship
    handle_relationship_update
  end

  # PATCH /users/:user_id/relationships/:relationship
  def update_relationship
    handle_relationship_update
  end

  # DELETE /users/:user_id/relationships/:relationship
  def destroy_relationship
    handle_relationship_update
  end

  # TODO: related resources

  protected

  ##
  # Handle relationship update authorization
  #
  def handle_relationship_update
    @user = User.find params[:user_id]

    # Authorize User#destroy_RELATIONSHIP?
    authorize_relationship @user

    klass = User.reflect_on_association(params[:relationship]).klass

    # Authorize RELATIONSHIP_CLASS#destroy_INVERSE_RELATIONSHIP?
    # FIXME: does not support polymorphic relationships (`type` is ignored)
    params[:data].pluck(:id).each do |id|
      resource = klass.find id

      authorize_inverse_relationship resource
    end

    super
  end
end
