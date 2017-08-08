# frozen_string_literal: true

class NotificationPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def index?
    # Everyone can list notifications
    true
  end

  def show?
    # Users can show notifications if the deck and the user are showable
    Pundit.policy!(@user, @record.deck).show? && Pundit.policy!(@user, @record.user).show?
  end

  ##
  # Relationship: user
  #
  def show_user?
    # Users can only show user relationship if the notification is showable
    # Authorize the user separately in the controller
    show?
  end

  ##
  # Relationship: deck
  #
  def show_deck?
    # Users can only show deck relationship if the notification is showable
    # Authorize the deck separately in the controller
    show?
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
end
