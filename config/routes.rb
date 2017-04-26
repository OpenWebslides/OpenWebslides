# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, :only => []

  namespace :auth, :constraints => { :format => :json } do
    get '/:provider/callback', :to => 'omniauth#callback'
  end

  # API endpoints
  namespace :api, :constraints => { :format => :json } do
    root :to => 'api#index'

    jsonapi_resources :users do
      get '/confirm' => 'users#confirm'
    end
    jsonapi_resources :decks
    jsonapi_resources :tags

    jsonapi_resource :token, :except => %i[show update]
  end

  # Application
  root :to => 'application#index'
  # get '*path', :to => 'application#index'
end
