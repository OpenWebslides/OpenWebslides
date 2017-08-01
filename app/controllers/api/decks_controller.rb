# frozen_string_literal: true

module Api
  class DecksController < ApiController
    # Authentication
    before_action :authenticate_user, :except => %i[index show]
    after_action :renew_token

    # Authorization
    after_action :verify_authorized, :except => :index
    after_action :verify_policy_scoped, :only => :index

    skip_before_action :jsonapi_request_handling, :only => :update

    # GET /decks
    def index
      @decks = policy_scope Deck

      jsonapi_render :json => @decks
    end

    # POST /decks
    def create
      begin
        @deck = Deck.new deck_params
      rescue ArgumentError
        # FIXME: Deck.new throws ArgumentError when :state is invalid
        # See https://github.com/rails/rails/issues/13971#issuecomment-287030984
        @deck = Deck.new deck_params.merge :state => ''
        invalid_state = true
      end

      authorize @deck

      if service.create
        jsonapi_render :json => @deck, :status => :created
      else
        # Explicitly add errors here, because @deck.errors gets cleared on #save
        @deck.errors.add :state, 'is invalid' if invalid_state
        jsonapi_render_errors :json => @deck, :status => :unprocessable_entity
      end
    end

    # GET /decks/:id
    def show
      @deck = Deck.find params[:id]

      authorize @deck

      if request.accept == JSONAPI::DECK_MEDIA_TYPE
        body = service.read

        render :body => body, :content_type => 'text/html', :encoding => 'utf-8'
      else
        jsonapi_render :json => @deck
      end
    end

    # PUT/PATCH /decks/:id
    def update
      @deck = Deck.find params[:id]

      authorize @deck

      if request.content_type == JSONAPI::DECK_MEDIA_TYPE
        update_content
      else
        update_model
      end
    end

    # Update filesystem contents
    def update_content
      service.update :author => current_user, :content => request.body.read

      head :no_content
    end

    # Update database model
    def update_model
      # TODO: helper to process requests based on media type
      setup_request
      unless @request.errors.blank?
        return jsonapi_render_errors :json => @request
      end

      if service.update resource_params
        jsonapi_render :json => @deck
      else
        jsonapi_render_errors :json => @deck, :status => :unprocessable_entity
      end
    rescue ArgumentError
      # FIXME: Deck.new throws ArgumentError when :state is invalid
      # See https://github.com/rails/rails/issues/13971#issuecomment-287030984
      @deck.errors.add :state, 'is invalid'
      jsonapi_render_errors :json => @deck, :status => :unprocessable_entity
    end

    # DELETE /decks/:id
    def destroy
      @deck = Deck.find params[:id]

      authorize @deck

      service.delete

      head :no_content
    end

    protected

    def deck_params
      resource_params.merge :user_id => relationship_params[:owner]
    end

    def service
      DeckService.new @deck
    end
  end
end
