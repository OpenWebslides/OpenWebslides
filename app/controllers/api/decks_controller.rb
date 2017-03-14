# frozen_string_literal: true
module Api
  class DecksController < ApiController
    def index
      @decks = policy_scope Deck
    end

    def show
      @deck = Deck.find params[:id]
      authorize @deck
    end

    def create
      @deck = Deck.new deck_params
      authorize @deck

      if @deck.save
        render :status => :created
      else
        head :unprocessable_entity
      end
    end

    def update
      @deck = Deck.find params[:id]
      authorize @deck

      if @deck.update deck_params
        render :status => :ok
      else
        head :unprocessable_entity
      end
    end

    def destroy
      @deck = Deck.find params[:id]
      authorize @deck

      @deck.destroy
      head :no_content
    end

    private

    def deck_params
      params.require(:deck).permit(:name, :description, :state)
    end
  end
end
