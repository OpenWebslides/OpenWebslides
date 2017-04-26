# frozen_string_literal: true

Rails.application.routes.draw do
  # Authentication
  devise_for :users, :only => [:confirmations]

  namespace :auth, :constraints => { :format => :json } do
    get '/:provider/callback', :to => 'omniauth#callback'
    post '/token' => 'auth#token'
    get '/expire' => 'auth#expire'
  end

  # API endpoints
  namespace :api, :constraints => { :format => :json } do
    root :to => 'api#index'

    jsonapi_resources :users do
      get '/confirm' => 'users#confirm'
    end
    jsonapi_resources :decks
    jsonapi_resources :tags
  end

  # Application
  root :to => 'application#index'
  get '*path', :to => 'application#index'
end
