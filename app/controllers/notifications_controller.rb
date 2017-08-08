# frozen_string_literal: true

class NotificationsController < ApplicationController
  include Relationships
  include RelatedResources

  # Authentication
  after_action :renew_token

  # Authorization
  after_action :verify_authorized, :except => %i[index show_relationship get_related_resources]
  after_action :verify_policy_scoped, :only => %i[index get_related_resources]
  after_action :verify_authorized_or_policy_scoped, :only => :show_relationship

  ##
  # Resource
  #

  # GET /notifications
  def index
    @notifications = policy_scope Notification

    jsonapi_render :json => @notifications
  end

  # GET /notifications/:id
  def show
    @notification = Notification.find params[:id]

    authorize @notification

    jsonapi_render :json => @notification
  end

  ##
  # Relationships
  #
  # Relationships and related resource actions are implemented in the respective concerns
  #
end
