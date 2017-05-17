# frozen_string_literal: true

module Api
  class DecksController < ApiController
    MEDIA_TYPE = 'text/html'

    before_action :authenticate_user,
                  :only => %i[create update destroy]

    after_action :renew_token

    def show
      return super unless media_types_for('Accept').include? MEDIA_TYPE

      deck = Deck.find params[:id]
      raise Pundit::NotAuthorizedError unless DeckPolicy.new(current_user, deck).show?

      render :body => deck.content, :content_type => 'text/html'
    end

    def update
      return super unless request.content_type == MEDIA_TYPE

      deck = Deck.find params[:id]
      raise Pundit::NotAuthorizedError unless DeckPolicy.new(current_user, deck).update?

      deck.content = Nokogiri::HTML5.fragment(request.body.read).to_html

      head :no_content
    end
  end
end
