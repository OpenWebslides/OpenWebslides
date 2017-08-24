# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def index?
    # Everyone can list users
    true
  end

  def create?
    # Everyone can create a user
    true
  end

  def show?
    # Everyone can show a user
    true
  end

  def update?
    # Users can only update a user if it is their own
    !@user.nil? && @user == @record
  end

  def destroy?
    # Users can only update a user if the record is updatable
    update?
  end

  ##
  # Relationships: decks
  #
  def show_decks?
    # Users can only show decks relationships if the user is showable
    # Policy scope separately in the controller
    show?
  end

  ##
  # Relationships: collaborations
  #
  def show_collaborations?
    # Users can only show collaborations relationships if the user is showable
    # Policy scope separately in the controller
    show?
  end

  ##
  # Relationship: notifications
  #
  def show_notifications?
    # Users can only show notifications if the deck is showable
    # Policy scope separately in the controller
    show?
  end

  ##
  # Relationships: conversions
  #
  def show_conversions?
    # Users can only show their own conversions relationships
    !@user.nil? && @user == @record
  end

  ##
  # Relationships: annotations
  #
  def show_annotations?
    # Users can show annotations relationship if the user is showable
    # Policy scope the annotations separately in the controller
    show?
  end

  ##
  # Scope
  #
  class Scope < Scope
    def resolve
      @scope.all
    end
  end
end
