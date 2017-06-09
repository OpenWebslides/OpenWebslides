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

      # Authorize show
      scope = DeckPolicy::Scope.new(current_user, Deck).resolve
      raise Pundit::NotAuthorizedError unless scope.where(:id => deck.id).exists?
      context[:policy_used]&.call

      render :body => deck.read_repository, :content_type => 'text/html'
    end

    def update
      return super unless request.content_type == MEDIA_TYPE

      deck = Deck.find params[:id]

      # Authorize update
      raise Pundit::NotAuthorizedError unless DeckPolicy.new(current_user, deck).update?
      context[:policy_used]&.call

      deck.update_repository :author => current_user, :content => Nokogiri::HTML5.fragment(request.body.read).to_html

      head :no_content
    end
  end
end
