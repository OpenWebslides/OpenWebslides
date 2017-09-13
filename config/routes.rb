# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, :only => []

  root :to => proc { [404, {}, []] }

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
    root :to => proc { [404, {}, []] }

    ##
    # User API
    #
    jsonapi_resources :users do
      # Decks relationship
      jsonapi_related_resources :decks
      jsonapi_links :decks, :only => :show

      # Collaborations relationship
      jsonapi_related_resources :collaborations
      jsonapi_links :collaborations, :only => :show

      # Conversions relationship
      jsonapi_related_resources :conversions
      jsonapi_links :conversions, :only => :show
    end

    ##
    # Decks API
    #
    jsonapi_resources :decks do
      # Owner relationship
      jsonapi_related_resource :owner
      jsonapi_link :owner, :only => :show

      # Collaborators relationship
      jsonapi_related_resources :collaborators
      jsonapi_links :collaborators, :only => :show

      # Assets relationship
      jsonapi_related_resources :assets
      jsonapi_links :assets, :only => :show

      # Conversations relationship
      jsonapi_related_resources :conversations
      jsonapi_links :conversations, :only => :show

      jsonapi_resources :assets, :only => :create
    end

    ##
    # Assets API
    #
    jsonapi_resources :assets, :only => %i[show destroy] do
      # Deck relationship
      jsonapi_related_resource :deck
      jsonapi_link :deck, :only => :show

      get '/raw' => 'assets#raw'
    end

    ##
    # Conversions API (immutable)
    #
    jsonapi_resources :conversions, :only => %i[create show] do
      # Deck relationship
      jsonapi_related_resource :deck
      jsonapi_link :deck, :only => :show

      # User relationship
      jsonapi_related_resource :user
      jsonapi_link :user, :only => :show
    end

    ##
    # Notifications API (immutable)
    #
    jsonapi_resources :notifications, :only => %i[index show] do
      # Deck relationship
      jsonapi_related_resource :deck
      jsonapi_link :deck, :only => :show

      # User relationship
      jsonapi_related_resource :user
      jsonapi_link :user, :only => :show
    end

    ##
    # Annotations API
    #
    jsonapi_resources :conversations, :except => %i[index] do
      # Deck relationship
      jsonapi_related_resource :deck
      jsonapi_link :deck, :only => :show

      # User relationship
      jsonapi_related_resource :user
      jsonapi_links :user, :only => :show

      # Comments relationship
      jsonapi_related_resources :comments
      jsonapi_links :comments, :only => :show

      # Rating
      jsonapi_resource :rating, :only => %i[create destroy] do end

      # Flag
      jsonapi_resource :flag, :only => %i[create] do end
    end

    jsonapi_resources :comments, :except => %i[index] do
      # Deck relationship
      jsonapi_related_resource :deck
      jsonapi_links :deck, :only => :show

      # User relationship
      jsonapi_related_resource :user
      jsonapi_links :user, :only => :show

      # Conversation relationship
      jsonapi_related_resource :conversation
      jsonapi_link :conversation, :only => :show

      # Rating
      jsonapi_resource :rating, :only => %i[create destroy] do end

      # Flag
      jsonapi_resource :flag, :only => %i[create] do end
    end

    ## Authentication
    jsonapi_resource :confirmation, :only => :create do end
    jsonapi_resource :token, :only => %i[create destroy] do end
    jsonapi_resource :password, :only => %i[create update] do end
  end
end
