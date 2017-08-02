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
  scope :api, :constraints => { :format => :json } do
    ## Users
    jsonapi_resources :users

    ## Decks
    jsonapi_resources :decks do
      ## Assets
      jsonapi_resources :assets, :only => :create do end

      # Route owner (without :create or :destroy)
      jsonapi_link :owner, :except => %i[create destroy]
      jsonapi_related_resource :owner

      # Route other relationships
      %i[collaborators assets].each do |relationship_name|
        jsonapi_links relationship_name
        jsonapi_related_resources relationship_name
      end
    end

    ## Assets
    jsonapi_resources :assets, :only => %i[show destroy] do
      get '/raw' => 'assets#raw'
    end

    ## Conversion tool
    jsonapi_resources :conversions, :only => %i[create show]

    ## Social feed
    jsonapi_resources :notifications

    ## Authentication
    jsonapi_resource :confirmation, :only => :create do end
    jsonapi_resource :token, :only => %i[create destroy] do end
    jsonapi_resource :password, :only => %i[create update] do end
  end
end
