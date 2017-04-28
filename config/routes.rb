# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, :only => []

  namespace :auth, :constraints => { :format => :json } do
    get '/:provider/callback', :to => 'omniauth#callback'
  end

  # API endpoints
  namespace :api, :constraints => { :format => :json } do
    root :to => 'api#index'

    jsonapi_resources :users
    jsonapi_resources :decks
    jsonapi_resources :tags

    jsonapi_resource :confirmation, :only => :create
    jsonapi_resource :token, :only => %i[create destroy]
    jsonapi_resource :password, :only => %i[create update]
  end

  # Application
  root :to => 'application#index'
  get '*path', :to => 'application#index'
end
