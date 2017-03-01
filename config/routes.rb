# frozen_string_literal: true
Rails.application.routes.draw do
  # Application
  root :to => 'application#index'

  # API
  namespace :api, :constraints => { :format => :json } do
    root :to => 'api#index'

    # Authentication
    mount_devise_token_auth_for 'User', :at => 'auth'

    # API
    resources :users, :except => [:new, :edit] do
      resources :decks, :except => [:new, :edit]
    end

    resources :tags, :except => [:new, :edit]
  end
end
