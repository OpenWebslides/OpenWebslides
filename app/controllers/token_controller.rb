# frozen_string_literal: true

class TokenController < ApplicationController
  include JWT::Auth::Authentication

  before_action :authenticate, :only => [:create]

  def create
    token = JWT::Auth::Token.from_user resource
    render :json => { :jwt => token.to_jwt }, :status => :created
  end

  protected

  def authenticate
    head :unauthorized unless resource && resource.authenticate(auth_params[:password])
  end

  def resource
    @resource ||= User.find_by :email => auth_params[:email]
  end

  def auth_params
    params.require(:auth).permit :email, :password
  end
end
