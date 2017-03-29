# frozen_string_literal: true
class OmniauthController < ApplicationController
  def callback
    retrieve_identity
    sync_information
    create_token

    # response.headers['X-Access-Token'] = @resource.token
    response.headers['X-Access-Token'] = 'mytoken'
    redirect_to '/'
  end

  protected

  def auth_hash
    @auth_hash ||= request.env['omniauth.auth']
  end

  def retrieve_identity # rubocop:disable AbcSize
    raise unless auth_hash['info']['email']

    identity = Identity.where(:uid => auth_hash['uid'], :provider => auth_hash['provider']).first
    @resource = User.find_by :email => auth_hash['info']['email']

    if identity
      # Existing user and identity
    elsif @resource
      # Existing user
      Identity.new :user => @resource, :uid => auth_hash['uid'], :provider => auth_hash['provider']
    else
      # New user
      @resource = User.new :email => auth_hash['info']['email']

      set_random_password
    end
  end

  def set_random_password
    # Set crazy password for new oauth users. this is only used to prevent access via email sign-in.

    # password = SecureRandom.urlsafe_base64(nil, false)
    # @resource.password = password
    # @resource.password_confirmation = password
  end

  def sync_information; end

  def create_token; end
end
