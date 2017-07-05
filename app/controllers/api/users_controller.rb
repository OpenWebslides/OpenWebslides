# frozen_string_literal: true

module Api
  class UsersController < ApiController
    # Authentication
    before_action :authenticate_user, :only => %i[update destroy]
    after_action :renew_token, :except => :destroy

    # Authorization
    after_action :verify_authorized, :except => :index
    after_action :verify_policy_scoped, :only => :index

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
      @user = User.find(params[:id]).destroy

      authorize @user

      head :no_content
    end
  end
end
