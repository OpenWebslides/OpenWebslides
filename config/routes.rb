# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, :only => []

  root :to => 'application#index'

  ##
  # OAuth2 endpoints
  #
  namespace :auth, :constraints => { :format => :json } do
    get '/:provider/callback', :to => 'omniauth#callback'
  end

  ##
  # API endpoints
  #
  namespace :api, :constraints => { :format => :json } do
    # Users and decks
    jsonapi_resources :users
    jsonapi_resources :decks
    jsonapi_resources :assets, :except => :index do end

    # Social feed
    jsonapi_resources :notifications, :only => %i[index show] do end

    # Authentication
    jsonapi_resource :confirmation, :only => :create do end
    jsonapi_resource :token, :only => %i[create destroy] do end
    jsonapi_resource :password, :only => %i[create update] do end
  end
end
