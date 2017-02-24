Rails.application.routes.draw do
  # Application
  root :to => 'application#index'

  # API
  namespace :api do
    root :to => 'api#index'

    resources :users, :except => [:new, :edit] do
      resources :decks, :except => [:new, :edit]
    end

    resources :tags, :except => [:new, :edit]
  end
end
