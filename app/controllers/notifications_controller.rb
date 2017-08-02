# frozen_string_literal: true

class NotificationsController < ApplicationController
  # Authentication
  after_action :renew_token

  # Authorization
  after_action :verify_authorized, :only => :show
  after_action :verify_policy_scoped, :only => :index

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
end
