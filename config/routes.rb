# frozen_string_literal: true
Rails.application.routes.draw do
  # Application
  root :to => 'application#index'

  # Authentication
  get '/auth/:provider/callback', :to => 'omniauth#callback'
  post '/auth/token' => 'user_token#create'

  # API endpoints
  namespace :api, :constraints => { :format => :json } do
    root :to => 'api#index'

    jsonapi_resources :users
    jsonapi_resources :decks
    jsonapi_resources :tags
  end
end
