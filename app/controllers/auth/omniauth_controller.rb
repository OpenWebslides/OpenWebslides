# frozen_string_literal: true

module Auth
  class OmniauthController < ApplicationController
    include JWT::Auth::Authentication

    ##
    # OAuth2 callback
    #
    def callback
      retrieve_identity
      sync_information

      @resource.save

      token = JWT::Auth::Token.from_user @resource
      render :json => { :jwt => token.to_jwt }, :status => :created
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
  end
end
