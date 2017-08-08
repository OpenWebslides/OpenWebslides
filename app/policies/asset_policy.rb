# frozen_string_literal: true

class AssetPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def create?
    # Users can create but only for updatable decks
    deck_policy.update?
  end

  def show?
    # Users can show but only for showable decks
    deck_policy.show?
  end

  def update?
    # Users can update but only for updatable decks
    deck_policy.update?
  end

  def destroy?
    # Users can destroy but only for updatable decks
    deck_policy.update?
  end

  ##
  # Relationship: deck
  #
  def show_deck?
    # Users can show an asset but only for showable decks
    deck_policy.show?
  end

  ##
  # Scope
  #
  class Scope < Scope
    def resolve
      # Defer asset scoping to the respective decks
      DeckPolicy::Scope.new(@user, scope.joins(:deck)).resolve
    end
  end

  private

  def deck_policy
    @deck_policy ||= DeckPolicy.new @user, @record.deck
  end
end
