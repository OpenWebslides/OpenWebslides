# frozen_string_literal: true

class DeckPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    true
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

  def create?
    # Users can create a deck
    !@user.nil?
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

  class Scope
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
