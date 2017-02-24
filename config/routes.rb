Rails.application.routes.draw do
  # Application
  root :to => 'application#index'

  # API
  namespace :api do
    root :to => 'api#index'

    resource :users do
      resource :decks
    end
  end
end
