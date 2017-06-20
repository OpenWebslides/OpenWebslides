# frozen_string_literal: true

class AssetPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
    @deck_policy = DeckPolicy.new @user, @record.deck
  end

  def create?
    # Users can create an asset but only for decks with write access
    @deck_policy.update?
  end

  def update?
    # Users can update an asset but only for decks with write access
    @deck_policy.update?
  end

  def destroy?
    # Users can destroy an asset but only for decks with write access
    @deck_policy.update?
  end

  # TODO: scope
end
