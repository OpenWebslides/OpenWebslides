# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def index?
    true
  end

  def create?
    true
  end

  def show?
    true
  end

  def update?
    # Users can only update their own account
    !@user.nil? && @user == @record
  end

  def destroy?
    update?
  end

  ##
  # Relationships: decks
  #
  def create_decks?
    # Users can only create relationships if the record is updatable
    update?
  end

  def show_decks?
    # Users can only show relationships if the record is showable
    show?
  end

  def update_decks?
    # Users can only update relationships if the record is updatable
    update?
  end

  def destroy_decks?
    # Users can only destroy relationships if the record is updatable
    update?
  end

  ##
  # Relationships: collaborations
  #
  def create_collaborations?
    # Users can only create relationships if the record is updatable
    update?
  end

  def show_collaborations?
    # Users can only show relationships if the record is showable
    show?
  end

  def update_collaborations?
    # Users can only update relationships if the record is updatable
    update?
  end

  def destroy_collaborations?
    # Users can only destroy relationships if the record is updatable
    update?
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
