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

      if @deck.save
        jsonapi_render :json => @deck, :status => :created
      else
        @deck.errors.add :state, 'is invalid' if invalid_state
        jsonapi_render_errors :json => @deck, :status => :unprocessable_entity
      end
    end

    # GET /decks/:id
    def show
      @deck = Deck.find params[:id]

      authorize @deck

      if request.accept == JSONAPI::DECK_MEDIA_TYPE
        # TODO: proper mechanism to skip Commands in test env
        body = ActiveRecord::Base.skip_callbacks ? '' : @deck.read_repository

        render :body => body, :content_type => 'text/html'
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
      unless ActiveRecord::Base.skip_callbacks
        @deck.update_repository :author => current_user, :content => Nokogiri::HTML5.fragment(request.body.read).to_html
      end

      head :no_content
    end

    # Update database model
    def update_model
      setup_request
      check_request

      if @deck.update resource_params
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

      @deck.destroy

      head :no_content
    end

    protected

    def deck_params
      resource_params.merge :user_id => relationship_params[:owner]
    end
  end
end
