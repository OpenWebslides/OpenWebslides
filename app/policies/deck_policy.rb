# frozen_string_literal: true
class DeckPolicy
  attr_reader :user, :deck

  def initialize(user, deck)
    @user = user
    @deck = deck
  end

  def read?
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

  def update?
    return false if @user.nil?
    @deck.owner == @user || @deck.contributors.include?(@user)
  end

  def admin?; end
end
