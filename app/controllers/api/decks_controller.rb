# frozen_string_literal: true

module Api
  class DecksController < ApiController
    MEDIA_TYPE = 'text/html'

    before_action :authenticate_user,
                  :only => %i[create update destroy create_relationship update_relationship destroy_relationship]

    after_action :renew_token

    def show
      return super unless media_types_for('Accept').include? MEDIA_TYPE

      deck = Deck.find params[:id]
      raise Pundit::NotAuthorizedError unless DeckPolicy.new(current_user, deck).show?
      send_file File.join OpenWebslides::Configuration.repository_path, deck.canonical_name, 'index.html'
    end
  end
end
