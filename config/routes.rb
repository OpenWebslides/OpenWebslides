Rails.application.routes.draw do
  namespace :api do
    root 'api#index'

    resource :users do
      resource :decks
    end
  end
end
