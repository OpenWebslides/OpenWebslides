# frozen_string_literal: true

require 'nokogiri'

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

      content = Nokogiri::HTML(deck.content).at('body').children.to_html

      render :body => content, :content_type => 'text/html'
    end
  end
end
