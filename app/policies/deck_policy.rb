# frozen_string_literal: true

class DeckPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  ##
  # Resource
  #
  def index?
    true
  end

  def create?
    # Users can create a deck but only for itself
    !@user.nil? && @record.owner == @user
  end

  def show?
    if @record.public_access?
      # Users and guests can read
      true
    elsif @record.protected_access?
      # Users can read protected deck
      !@user.nil?
    elsif @record.private_access?
      return false if @user.nil?
      # Owner and collaborators can read private deck
      @record.owner == @user || @record.collaborators.include?(@user)
    end
  end

  def update?
    return false if @user.nil?

    # Owner and collaborators can update deck
    @record.owner == @user || @record.collaborators.include?(@user)
  end

  def destroy?
    return false if @user.nil?

    # Owner can destroy deck
    @record.owner == @user
  end

  ##
  # Relationship: owner
  #
  def show_owner?
    # Users can only show owner if the record is showable
    show?
  end

  def update_owner?
    # Users can only update owner if the record is destroyable
    destroy?
  end

  def destroy_owner?
    # Owner relationship can never be destroyed
    false
  end

  ##
  # Relationship: collaborators
  #
  def create_collaborators?
    # Users can only create collaborators if the record is destroyable
    destroy?
  end

  def show_collaborators?
    # Users can only show collaborators if the record is showable
    show?
  end

  def update_collaborators?
    # Users can only update collaborators if the record is destroyable
    destroy?
  end

  def destroy_collaborators?
    # Users can only destroy collaborators if the record is destroyable
    destroy?
  end

  ##
  # Relationship: assets
  #
  def create_assets?
    # Users can only create assets if the record is updatable
    update?
  end

  def show_assets?
    # Users can only show assets if the record is showable
    show?
  end

  def update_assets?
    # Users can only update assets if the record is updatable
    update?
  end

  def destroy_assets?
    # Users can only destroy assets if the record is updatable
    update?
  end

  ##
  # Scope
  #
  class Scope < Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      if @user
        # Users can see public decks, protected decks and collaborations
        scope.left_outer_joins(:collaborators).where.not(:state => 'private_access')
             .or(scope.left_outer_joins(:collaborators).where(:owner => @user))
             .or(scope.left_outer_joins(:collaborators).where('decks_users.user_id = ?', @user.id)).distinct
      else
        # Everyone can see public decks
        scope
          .where(:state => 'public_access')
      end
    end
  end
end
