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

    # Authorize User#show_relationship?
    authorize_relationship @user

    # Authorize Relationship#show_user?
    policy_scope(@user.send params[:relationship]).each { |resource| authorize_inverse_relationship resource }

    super
  end

  # POST /users/:user_id/relationships/:relationship
  def create_relationship
    skip_authorization

    # Don't allow creating a relationship, as creating a deck handles this
    head :method_not_allowed
  end

  # PATCH /users/:user_id/relationships/:relationship
  def update_relationship
    skip_authorization

    # Don't allow updating a relationship, as modifying a deck's relationship handles this
    head :method_not_allowed
  end

  # DELETE /users/:user_id/relationships/:relationship
  def destroy_relationship
    skip_authorization

    # Don't allow destroying a relationship, as destroying a deck handles this
    head :method_not_allowed
  end

  # TODO: related resources
end
