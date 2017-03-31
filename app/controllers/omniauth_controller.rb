# frozen_string_literal: true
class OmniauthController < ApplicationController
  ##
  # OAuth2 callback
  #
  def callback
    retrieve_identity
    sync_information
    create_token

    @resource.save

    # response.headers['X-Access-Token'] = @resource.token
    response.headers['X-Access-Token'] = 'mytoken'
    redirect_to '/'
  end

  ##
  # Email sign in
  #
  def sign_in
    return head :bad_request unless params[:email] && params[:password]

    user = User.find_by :email => params[:email]
    return head :unauthorized unless user

    authenticated_user = user.authenticate params[:password]
    return head :unauthorized unless authenticated_user

    render :json => { :token => authenticated_user.token }
  end

  protected

  def auth_hash
    @auth_hash ||= request.env['omniauth.auth']
  end

  def retrieve_identity
    raise unless auth_hash['info']['email']

    find_or_create_user
    find_or_create_identity

    Rails.logger.info "Authenticated user #{@resource.email} with provider #{@identity.provider}"
  end

  def find_or_create_user
    @resource = User.find_by :email => auth_hash['info']['email']

    return if @resource

    # New user
    attrs = {
      :name => auth_hash['info']['name'],
      :email => auth_hash['info']['email']
    }
    @resource = User.new attrs

    set_random_password

    @resource.save

    Rails.logger.info "Authenticated new user #{@resource.email}"
  end

  def find_or_create_identity
    @identity = @resource.identities.where(:uid => auth_hash['uid'], :provider => auth_hash['provider']).first

    return if @identity

    # New identity
    @identity = @resource.identities.build :uid => auth_hash['uid'], :provider => auth_hash['provider']
    @identity.save

    Rails.logger.info "Authenticated user #{@resource.email} with new provider #{@identity.provider}"
  end

  def set_random_password
    # Set crazy password for new oauth users. this is only used to prevent access via email sign-in.
    password = SecureRandom.urlsafe_base64(nil, false)
    @resource.password = password
    @resource.password_confirmation = password
  end

  def sync_information
    @resource.name ||= auth_hash['info']['name']
  end

  def create_token; end
end
