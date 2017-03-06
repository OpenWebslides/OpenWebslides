# frozen_string_literal: true
class DeckPolicy
  attr_reader :user, :deck

  def initialize(user, deck)
    @user = user
    @deck = deck
  end

  def show?
    if @deck.public_access?
      # Everyone can read
      true
    elsif @deck.protected_access?
      # Authenticated users can read protected deck
      !@user.nil?
    elsif @deck.private_access?
      return false if @user.nil?
      # Owner and collaborators users can read private deck
      @deck.owner == @user || @deck.contributors.include?(@user)
    else
      false
    end
  end

  def create?
    # Authenticated users can create a deck
    !@user.nil?
  end

  def update?
    return false if @user.nil?
    @deck.owner == @user || @deck.contributors.include?(@user)
  end

  def destroy?
    return false if @user.nil?
    @deck.owner == @user
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      # Return accessible decks
      if @user
        scope.where(:state => 'public_access')
             .merge(@user.contributions)
             .merge(@user.decks)
      else
        scope.where(:state => 'public_access')
      end
    end
  end
end
