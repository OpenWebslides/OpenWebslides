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

    authorize_relationship @user

    @resources = policy_scope @user.send params[:relationship]

    super
  end

  # POST /users/:user_id/relationships/:relationship
  def create_relationship
    @user = User.find params[:user_id]

    authorize_relationship @user

    @deck = Deck.find relationship_params[:deck_id]

    authorize_relationship @deck

    super
  end

  # PATCH /users/:user_id/relationships/:relationship
  def update_relationship
    @user = User.find params[:user_id]

    authorize_relationship @user

    @deck = Deck.find relationship_params[:deck_id]

    authorize_relationship @deck

    super
  end

  # DELETE /users/:user_id/relationships/:relationship
  def destroy_relationship
    @user = User.find params[:user_id]

    authorize_relationship @user

    @deck = Deck.find relationship_params[:deck_id]

    authorize_relationship @deck

    super
  end

  # TODO: related resources
end
