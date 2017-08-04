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
  def create_decks?
    # Users can only create decks relationships if the user is updatable
    # Authorize the deck separately in the controller
    update?
  end

  def show_decks?
    # Users can only show decks relationships if the user is showable
    # Policy scope separately in the controller
    show?
  end

  def update_decks?
    # Users can only update decks relationships if the user is updatable
    # Authorize the deck separately in the controller
    update?
  end

  def destroy_decks?
    # Users can only destroy decks relationships if the user is updatable
    # Authorize the deck separately in the controller
    update?
  end

  ##
  # Relationships: collaborations
  #
  def create_collaborations?
    # Users can only create collaborations relationships if the user is updatable
    # Authorize the deck separately in the controller
    update?
  end

  def show_collaborations?
    # Users can only show collaborations relationships if the user is showable
    # Policy scope separately in the controller
    show?
  end

  def update_collaborations?
    # Users can only update collaborations relationships if the user is updatable
    # Authorize the deck separately in the controller
    update?
  end

  def destroy_collaborations?
    # Users can only destroy collaborations relationships if the user is updatable
    # Authorize the deck separately in the controller
    update?
  end

  ##
  # Relationships: conversions
  #
  def create_conversions?
    # Users cannot create conversions relationships
    false
  end

  def show_conversions?
    # Users can only show their own conversions relationships
    !@user.nil? && @user == @record
  end

  def update_conversions?
    # Users cannot update conversions relationships
    false
  end

  def destroy_conversions?
    # Users cannot destroy conversions relationships
    false
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
