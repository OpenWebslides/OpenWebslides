# frozen_string_literal: true

class ConfirmationController < ApplicationController
  # Authorization
  after_action :verify_authorized

  def create
    authorize :confirmation

    @user = User.confirm_by_token resource_params[:confirmation_token]

    if @user.errors.empty?
      jsonapi_render :json => @user, :status => :created
    else
      jsonapi_render_errors :json => @user, :status => :unprocessable_entity
    end
  end
end
