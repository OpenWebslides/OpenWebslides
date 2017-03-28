# frozen_string_literal: true
Rails.application.routes.draw do
  # Application
  root :to => 'application#index'

  # API
  namespace :api, :constraints => { :format => :json } do
    root :to => 'api#index'

    jsonapi_resources :users, :only => [:index, :show]
    jsonapi_resources :decks
    jsonapi_resources :tags
  end
end
