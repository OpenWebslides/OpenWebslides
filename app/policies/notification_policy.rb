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
    # Users can show notifications if the subject and item are showable
    Pundit.policy!(@user, @record.item).show? && Pundit.policy!(@user, @record.subject).show?
  end

  ##
  # Relationship: subject
  #
  def show_subject?
    # Users can only show subject relationship if the notification is showable
    # Authorize the subject separately in the controller
    show?
  end

  ##
  # Relationship: item
  #
  def show_item?
    # Users can only show item relationship if the notification is showable
    # Authorize the item separately in the controller
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
      # Defer notification scoping to the respective items
      decks = Deck.where :id => scope.pluck(:deck_id)

      Notification.where :deck_id => DeckPolicy::Scope.new(@user, decks).resolve.pluck(:id)
    end
  end
end
