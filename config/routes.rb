Rails.application.routes.draw do
  root 'api#index'

  resource :users do
    resource :decks
  end
end
